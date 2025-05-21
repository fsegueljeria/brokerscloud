export type TypePropertyType = 'CASA' | string
export type PropertyState = 'BORRADOR' | string

export type PropertyLayoutProps = {
  id: string | undefined
}

export type PropertyType = {
  id: number
  code: string
  name: string
  description: string
  type: TypePropertyType
  price: number
  curCode: string
  shared: boolean
  numberOfBedrooms: number
  numberOfBathrooms: number
  yearBuilt: number
  m2Built: number
  m2SemiCovered: number
  area: number
  address: string
  zip: string
  city: string
  x: number
  y: number
  state: PropertyState
  organization: null | string
  owner: null | string
}

export type PropertyListType = {
  content: PropertyType[]
  totalElements: number
}


export type InvoicePaymentType = {
  iban: string
  totalDue: string
  bankName: string
  country: string
  swiftCode: string
}

export type SingleInvoiceType = {
  invoice: PropertyType
  paymentDetails: InvoicePaymentType
}
