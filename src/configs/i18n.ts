export const i18n = {
  defaultLocale: 'es',
  locales: ['es', 'en', /*'fr', 'ar', */],
  langDirection: {
    es: 'ltr',
    en: 'ltr'

    //fr: 'ltr',
    //ar: 'rtl',
    
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
