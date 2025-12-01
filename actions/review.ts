'use server'

import { ReviewFormState } from '@/types/reviews'
import { createClient } from '@/utils/supabase/server'

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
    const quality = Number(formData.get('quality'))
    const value = Number(formData.get('value'))
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

    const supabase = await createClient()

    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert([
        {
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
      ])
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
  formData: FormData
): Promise<ReviewFormState> {
  try {
    const id = formData.get('id') as string
    const review = formData.get('review') as string
    const rating = Number(formData.get('rating'))

    if (!id) {
      return {
        success: false,
        errors: [{ field: [], message: 'Review ID is required' }],
      }
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('reviews')
      .update({ review, rating })
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      return {
        success: false,
        errors: [{ field: [], message: error?.message || 'Update failed' }],
      }
    }

    return { success: true, review: data }
  } catch (err) {
    return { success: false, errors: [{ field: [], message: 'Server error' }] }
  }
}

export async function deleteReviewAction(id: string): Promise<ReviewFormState> {
  try {
    if (!id)
      return {
        success: false,
        errors: [{ field: [], message: 'Review ID is required' }],
      }

    const supabase = await createClient()
    const { error } = await supabase.from('reviews').delete().eq('id', id)

    if (error)
      return { success: false, errors: [{ field: [], message: error.message }] }

    return { success: true }
  } catch (err) {
    return { success: false, errors: [{ field: [], message: 'Server error' }] }
  }
}
