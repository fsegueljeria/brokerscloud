// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'Inicio',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'Propiedades',
    href: '/property',
    icon: 'ri-information-line'
  }
]

export default verticalMenuData
