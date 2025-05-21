import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.BASEPATH,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/es/dashboards/crm',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(es|en)',
        destination: '/:lang/dashboards/crm',
        permanent: true,
        locale: false
      },
      {
        source: '/((?!(?:es|en|front-pages|favicon.ico)\\b)):path',
        destination: '/es/:path',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
