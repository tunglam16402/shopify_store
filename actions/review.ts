'use server'

import { getCustomer } from '@/shopify/customer/use-customer'
import { ReviewFormState } from '@/types/reviews'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function createReviewAction(
  initialState: ReviewFormState,
  formData: FormData,
  productId: string
): Promise<ReviewFormState> {
  try {
    const rating = Number(formData.get('rating'))
    const comment = formData.get('comment') as string
    const headline = formData.get('headline') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const files = formData.getAll('media') as File[]
    const quality = formData.get('quality') || null
    const value = formData.get('value') || null
    const age_range = formData.get('age_range') as string
    const recommend = formData.get('recommend') as string

    const validFiles = files.filter(
      (f) => f instanceof File && f.size > 0 && f.name !== 'undefined'
    )

    if (validFiles.length > 3) {
      return {
        success: false,
        errors: [{ field: ['media'], message: 'Maximum 3 files allowed' }],
      }
    }
    const cookieStore = await cookies()

    const accessToken = cookieStore.get('shopify_customer_token')?.value || ''
    const user = await getCustomer(accessToken)

    const supabase = await createClient()

    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .upsert(
        {
          user_id: user?.id,
          product_id: productId,
          username,
          comment,
          rating,
          headline,
          email,
          quality,
          value,
          age_range,
          recommend,
        },
        {
          onConflict: 'user_id,product_id',
        }
      )
      .select()
      .single()

    if (reviewError || !review) {
      return {
        success: false,
        errors: [
          {
            field: [],
            message: reviewError?.message || 'Failed to create review',
          },
        ],
      }
    }

    for (const file of validFiles) {
      try {
        const ext = file.name.split('.').pop()
        const fileName = `${review.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

        const buffer = new Uint8Array(await file.arrayBuffer())

        const { error: uploadError } = await supabase.storage
          .from('review-media')
          .upload(fileName, buffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) continue

        const { data: urlData } = supabase.storage
          .from('review-media')
          .getPublicUrl(fileName)

        await supabase.from('review_media').insert({
          review_id: review.id,
          url: urlData.publicUrl,
          type: file.type.startsWith('image') ? 'image' : 'video',
        })
      } catch {
        continue
      }
    }

    return { success: true, review }
  } catch (err) {
    return {
      success: false,
      errors: [
        {
          field: [],
          message:
            err instanceof Error ? err.message : 'An unexpected error occurred',
        },
      ],
    }
  }
}

export async function updateReviewAction(
  initialState: ReviewFormState,
  formData: FormData,
  reviewId: string
): Promise<ReviewFormState> {
  try {
    const rating = Number(formData.get('rating'))
    const comment = formData.get('comment') as string
    const headline = formData.get('headline') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const quality = formData.get('quality') || null
    const value = formData.get('value') || null
    const age_range = formData.get('age_range') as string
    const recommend = formData.get('recommend') as string

    const files = formData.getAll('media') as File[]
    const removedMediaIds = formData.getAll('removed_media_ids') as string[]

    const validFiles = files.filter(
      (f) => f instanceof File && f.size > 0 && f.name !== 'undefined'
    )

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('shopify_customer_token')?.value || ''

    const user = await getCustomer(accessToken)
    if (!user) {
      return {
        success: false,
        errors: [{ field: [], message: 'Unauthorized' }],
      }
    }

    const supabase = await createClient()

    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .select('id')
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .single()

    if (reviewError || !review) {
      return {
        success: false,
        errors: [{ field: [], message: 'Review not found' }],
      }
    }

    const { error: updateError } = await supabase
      .from('reviews')
      .update({
        rating,
        comment,
        headline,
        username,
        email,
        quality,
        value,
        age_range,
        recommend,
        updated_at: new Date().toISOString(),
      })
      .eq('id', reviewId)

    if (updateError) {
      return {
        success: false,
        errors: [{ field: [], message: updateError.message }],
      }
    }

    if (removedMediaIds.length > 0) {
      await supabase
        .from('review_media')
        .delete()
        .in('id', removedMediaIds)
        .eq('review_id', reviewId)
    }

    const { count } = await supabase
      .from('review_media')
      .select('*', { count: 'exact', head: true })
      .eq('review_id', reviewId)

    if ((count || 0) + validFiles.length > 3) {
      return {
        success: false,
        errors: [{ field: ['media'], message: 'Maximum 3 files allowed' }],
      }
    }

    for (const file of validFiles) {
      const ext = file.name.split('.').pop()
      const fileName = `${reviewId}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`

      const buffer = new Uint8Array(await file.arrayBuffer())

      const { error: uploadError } = await supabase.storage
        .from('review-media')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) continue

      const { data: urlData } = supabase.storage
        .from('review-media')
        .getPublicUrl(fileName)

      await supabase.from('review_media').insert({
        review_id: reviewId,
        url: urlData.publicUrl,
        type: file.type.startsWith('image') ? 'image' : 'video',
      })
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      errors: [
        {
          field: [],
          message:
            err instanceof Error ? err.message : 'Unexpected error occurred',
        },
      ],
    }
  }
}

export async function deleteReviewAction(reviewId: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('shopify_customer_token')?.value || ''

    const user = await getCustomer(accessToken)
    if (!user) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    const supabase = await createClient()

    const { data: review, error } = await supabase
      .from('reviews')
      .select(
        `
        id,
        review_media (
          id,
          url
        )
      `
      )
      .eq('id', reviewId)
      .eq('user_id', user.id)
      .single()

    if (error || !review) {
      return {
        success: false,
        error: 'Review not found',
      }
    }

    // Delete media files from storage
    if (review.review_media?.length) {
      const paths = review.review_media
        .map((m) => {
          const idx = m.url.indexOf('/review-media/')
          return idx !== -1 ? m.url.slice(idx + '/review-media/'.length) : null
        })
        .filter(Boolean) as string[]

      if (paths.length) {
        await supabase.storage.from('review-media').remove(paths)
      }
    }

    // Delete media records
    await supabase.from('review_media').delete().eq('review_id', reviewId)

    await supabase.from('reviews').delete().eq('id', reviewId)

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unexpected error occurred',
    }
  }
}
