/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginCustomer } from '@/actions/login'
import { logoutCustomer } from '@/actions/logout'
import { LoginState } from '@/types/auth'
import { Customer } from '@/types/customer'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
interface UserState {
  isLoggedIn: boolean
  customer: Customer | null
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  isLoggedIn: false,
  customer: null,
  loading: false,
  error: null,
}

// ---- login ----
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const initialState: LoginState = {
        success: false,
        accessToken: null,
        expiresAt: null,
        errors: [],
      }

      const result = await loginCustomer(initialState, formData)

      if (!result.success) {
        return rejectWithValue(result.errors?.[0]?.message || 'Login failed')
      }

      return result
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed')
    }
  }
)

export const loadUserFromCookie = createAsyncThunk(
  'user/loadUserFromCookie',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/customer/get', {
        cache: 'no-store',
        credentials: 'include',
      })
      const data = await res.json()

      if (!data.customer) {
        throw new Error('No customer found')
      }
      
      return data.customer
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to load user')
    }
  }
)

// logout
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    await logoutCustomer()
    dispatch(logout())
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.customer = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })

    builder.addCase(loadUserFromCookie.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true
        state.customer = action.payload
      }
    })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
