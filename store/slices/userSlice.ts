/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { loginCustomer } from '@/actions/login'
import { getCustomer } from '@/shopify/customer/use-customer'
import { deleteCustomerAccessToken } from '@/shopify/auth/use-logout'

interface UserState {
  accessToken: string | null
  expiresAt: string | null
  isLoggedIn: boolean
  customer: any | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  accessToken: null,
  expiresAt: null,
  isLoggedIn: false,
  customer: null,
  loading: false,
  error: null,
}

// ---- LOGIN ----
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: FormData, { rejectWithValue }) => {
    const result = await loginCustomer(formData)
    console.log('loginResult:', result)
    if (!result.success) {
      return rejectWithValue(result.errors?.[0]?.message || 'Login failed')
    }

    console.log('result.accessToken! :>> ', result.accessToken!)

    const customer = await getCustomer(result.accessToken!)
    // if (!customer) {
    //   return rejectWithValue('Customer fetch failed after login')
    // }
    console.log('customer fetch result:', customer)

    return {
      accessToken: result.accessToken!,
      expiresAt: result.expiresAt!,
      customer,
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { getState, dispatch }) => {
    const state = getState() as { user: { accessToken: string | null } }
    const token = state.user.accessToken

    if (token) {
      await deleteCustomerAccessToken(token)
    }
    dispatch(logout())
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null
      state.expiresAt = null
      state.isLoggedIn = false
      state.customer = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // ---- LOGIN ----
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          accessToken: string
          expiresAt: string
          customer: any
        }>
      ) => {
        state.loading = false
        state.isLoggedIn = true
        state.accessToken = action.payload.accessToken
        state.expiresAt = action.payload.expiresAt
        state.customer = action.payload.customer
      }
    )
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
