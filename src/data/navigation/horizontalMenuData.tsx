// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
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

export default horizontalMenuData
