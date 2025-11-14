'use server'

import { ReviewFormState } from '@/types/reviews'
import { createClient } from '@/utils/supabase/server'

export async function createReviewAction(
  initialState: ReviewFormState,
  formData: FormData,
  productId: string
): Promise<ReviewFormState> {
  try {
    const username = formData.get('username') as string
    const comment = formData.get('comment') as string
    const rating = Number(formData.get('rating'))

    if (!username || !rating) {
      return {
        success: false,
        errors: [{ field: [], message: 'Username and rating are required' }],
      }
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ product_id: productId, username, comment, rating }])
      .select()
      .single()

    if (error || !data) {
      return {
        success: false,
        errors: [{ field: [], message: error?.message || 'Insert failed' }],
      }
    }

    return { success: true, review: data }
  } catch (err) {
    return { success: false, errors: [{ field: [], message: 'Server error' }] }
  }
}

export async function updateReviewAction(
  formData: FormData
): Promise<ReviewFormState> {
  try {
    const id = formData.get('id') as string
    const comment = formData.get('comment') as string
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
      .update({ comment, rating })
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

export async function deleteReviewAction(
  id: string
): Promise<ReviewFormState> {
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
