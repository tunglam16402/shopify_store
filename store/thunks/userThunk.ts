// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { AppDispatch } from '../store'
// import { getCustomer } from '@/shopify/customer/use-customer'
// import { setCustomer, setLoading, setError } from '../slices/userSlice'

// /**
//  * Fetch customer profile using accessToken
//  */
// export const fetchCustomerProfile =
//   (accessToken: string) => async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading(true))
//       const customer = await getCustomer(accessToken)

//       if (!customer) {
//         dispatch(setError('Failed to fetch customer profile'))
//         return
//       }

//       dispatch(
//         setCustomer({
//           id: customer.id,
//           firstName: customer.firstName || '',
//           lastName: customer.lastName || '',
//           email: customer.email || '',
//         })
//       )
//     } catch (error: any) {
//       dispatch(setError(error.message || 'Unknown error'))
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }


