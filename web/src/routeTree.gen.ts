/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as authImport } from './routes/__auth'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const authUsersLazyImport = createFileRoute('/__auth/users')()
const authPerangkatLazyImport = createFileRoute('/__auth/perangkat')()
const authAboutLazyImport = createFileRoute('/__auth/about')()
const authUsersRegisterLazyImport = createFileRoute('/__auth/users/register')()
const authPerangkatBaruLazyImport = createFileRoute('/__auth/perangkat/baru')()
const authPerangkatPerangkatIdLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId',
)()
const authPerangkatPerangkatIdHapusLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/hapus',
)()
const authPerangkatPerangkatIdEditLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/edit',
)()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const authRoute = authImport.update({
  id: '/__auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const authUsersLazyRoute = authUsersLazyImport
  .update({
    path: '/users',
    getParentRoute: () => authRoute,
  } as any)
  .lazy(() => import('./routes/__auth/users.lazy').then((d) => d.Route))

const authPerangkatLazyRoute = authPerangkatLazyImport
  .update({
    path: '/perangkat',
    getParentRoute: () => authRoute,
  } as any)
  .lazy(() => import('./routes/__auth/perangkat.lazy').then((d) => d.Route))

const authAboutLazyRoute = authAboutLazyImport
  .update({
    path: '/about',
    getParentRoute: () => authRoute,
  } as any)
  .lazy(() => import('./routes/__auth/about.lazy').then((d) => d.Route))

const authUsersRegisterLazyRoute = authUsersRegisterLazyImport
  .update({
    path: '/register',
    getParentRoute: () => authUsersLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/users/register.lazy').then((d) => d.Route),
  )

const authPerangkatBaruLazyRoute = authPerangkatBaruLazyImport
  .update({
    path: '/baru',
    getParentRoute: () => authPerangkatLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/perangkat/baru.lazy').then((d) => d.Route),
  )

const authPerangkatPerangkatIdLazyRoute = authPerangkatPerangkatIdLazyImport
  .update({
    path: '/$perangkatId',
    getParentRoute: () => authPerangkatLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/perangkat/$perangkatId.lazy').then((d) => d.Route),
  )

const authPerangkatPerangkatIdHapusLazyRoute =
  authPerangkatPerangkatIdHapusLazyImport
    .update({
      path: '/hapus',
      getParentRoute: () => authPerangkatPerangkatIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/perangkat/$perangkatId.hapus.lazy').then(
        (d) => d.Route,
      ),
    )

const authPerangkatPerangkatIdEditLazyRoute =
  authPerangkatPerangkatIdEditLazyImport
    .update({
      path: '/edit',
      getParentRoute: () => authPerangkatPerangkatIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/perangkat/$perangkatId.edit.lazy').then(
        (d) => d.Route,
      ),
    )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/__auth': {
      id: '/__auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/__auth/about': {
      id: '/__auth/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof authAboutLazyImport
      parentRoute: typeof authImport
    }
    '/__auth/perangkat': {
      id: '/__auth/perangkat'
      path: '/perangkat'
      fullPath: '/perangkat'
      preLoaderRoute: typeof authPerangkatLazyImport
      parentRoute: typeof authImport
    }
    '/__auth/users': {
      id: '/__auth/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof authUsersLazyImport
      parentRoute: typeof authImport
    }
    '/__auth/perangkat/$perangkatId': {
      id: '/__auth/perangkat/$perangkatId'
      path: '/$perangkatId'
      fullPath: '/perangkat/$perangkatId'
      preLoaderRoute: typeof authPerangkatPerangkatIdLazyImport
      parentRoute: typeof authPerangkatLazyImport
    }
    '/__auth/perangkat/baru': {
      id: '/__auth/perangkat/baru'
      path: '/baru'
      fullPath: '/perangkat/baru'
      preLoaderRoute: typeof authPerangkatBaruLazyImport
      parentRoute: typeof authPerangkatLazyImport
    }
    '/__auth/users/register': {
      id: '/__auth/users/register'
      path: '/register'
      fullPath: '/users/register'
      preLoaderRoute: typeof authUsersRegisterLazyImport
      parentRoute: typeof authUsersLazyImport
    }
    '/__auth/perangkat/$perangkatId/edit': {
      id: '/__auth/perangkat/$perangkatId/edit'
      path: '/edit'
      fullPath: '/perangkat/$perangkatId/edit'
      preLoaderRoute: typeof authPerangkatPerangkatIdEditLazyImport
      parentRoute: typeof authPerangkatPerangkatIdLazyImport
    }
    '/__auth/perangkat/$perangkatId/hapus': {
      id: '/__auth/perangkat/$perangkatId/hapus'
      path: '/hapus'
      fullPath: '/perangkat/$perangkatId/hapus'
      preLoaderRoute: typeof authPerangkatPerangkatIdHapusLazyImport
      parentRoute: typeof authPerangkatPerangkatIdLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  authRoute: authRoute.addChildren({
    authAboutLazyRoute,
    authPerangkatLazyRoute: authPerangkatLazyRoute.addChildren({
      authPerangkatPerangkatIdLazyRoute:
        authPerangkatPerangkatIdLazyRoute.addChildren({
          authPerangkatPerangkatIdEditLazyRoute,
          authPerangkatPerangkatIdHapusLazyRoute,
        }),
      authPerangkatBaruLazyRoute,
    }),
    authUsersLazyRoute: authUsersLazyRoute.addChildren({
      authUsersRegisterLazyRoute,
    }),
  }),
  LoginRoute,
})

/* prettier-ignore-end */
