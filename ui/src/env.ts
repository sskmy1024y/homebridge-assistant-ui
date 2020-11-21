export const environment = {
  production: false,
  api: {
    base: 'http://192.168.1.32:8581/api',
    socket: 'http://192.168.1.32:8581'
  },
  jwt: {
    whitelistedDomains: ['192.168.1.32:8581'],
    blacklistedRoutes: ['192.168.1.32:8581/api/auth/login']
  },
  apiHttpOptions: {
    withCredentials: true
  }
}
