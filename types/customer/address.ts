export type Address = {
  id: string
  address1: string
  address2?: string | null
  city: string
  company?: string | null
  country: string
  countryCodeV2?: string | null
  firstName: string
  lastName: string
  phone?: string | null
  province: string
  provinceCode?: string | null
  zip: string
  name?: string | null
  formatted?: string[]
}
