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
import { Route as authPerangkatImport } from './routes/__auth/perangkat'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const authUsersLazyImport = createFileRoute('/__auth/users')()
const authPengaturanLazyImport = createFileRoute('/__auth/pengaturan')()
const authAboutLazyImport = createFileRoute('/__auth/about')()
const authUsersRegisterLazyImport = createFileRoute('/__auth/users/register')()
const authPerangkatBaruLazyImport = createFileRoute('/__auth/perangkat/baru')()
const authPerangkatPerangkatIdLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId',
)()
const authPengaturanUnitLazyImport = createFileRoute(
  '/__auth/pengaturan/unit',
)()
const authPengaturanPowermeterLazyImport = createFileRoute(
  '/__auth/pengaturan/powermeter',
)()
const authPengaturanKampusLazyImport = createFileRoute(
  '/__auth/pengaturan/kampus',
)()
const authPengaturanGedungLazyImport = createFileRoute(
  '/__auth/pengaturan/gedung',
)()
const authPerangkatPerangkatIdLogsLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/logs',
)()
const authPerangkatPerangkatIdHapusLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/hapus',
)()
const authPerangkatPerangkatIdEditLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/edit',
)()
const authPerangkatPerangkatIdDataLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/data',
)()
const authPerangkatPerangkatIdArsipLazyImport = createFileRoute(
  '/__auth/perangkat/$perangkatId/arsip',
)()
const authPengaturanUnitBaruLazyImport = createFileRoute(
  '/__auth/pengaturan/unit/baru',
)()
const authPengaturanUnitUnitIdLazyImport = createFileRoute(
  '/__auth/pengaturan/unit/$unitId',
)()
const authPengaturanPowermeterBaruLazyImport = createFileRoute(
  '/__auth/pengaturan/powermeter/baru',
)()
const authPengaturanPowermeterPowermeterIdLazyImport = createFileRoute(
  '/__auth/pengaturan/powermeter/$powermeterId',
)()
const authPengaturanKampusBaruLazyImport = createFileRoute(
  '/__auth/pengaturan/kampus/baru',
)()
const authPengaturanKampusKampusIdLazyImport = createFileRoute(
  '/__auth/pengaturan/kampus/$kampusId',
)()
const authPengaturanGedungBaruLazyImport = createFileRoute(
  '/__auth/pengaturan/gedung/baru',
)()
const authPengaturanGedungGedungIdLazyImport = createFileRoute(
  '/__auth/pengaturan/gedung/$gedungId',
)()
const authPengaturanUnitUnitIdHapusLazyImport = createFileRoute(
  '/__auth/pengaturan/unit/$unitId/hapus',
)()
const authPengaturanUnitUnitIdEditLazyImport = createFileRoute(
  '/__auth/pengaturan/unit/$unitId/edit',
)()
const authPengaturanPowermeterPowermeterIdRegisterLazyImport = createFileRoute(
  '/__auth/pengaturan/powermeter/$powermeterId/register',
)()
const authPengaturanPowermeterPowermeterIdHapusLazyImport = createFileRoute(
  '/__auth/pengaturan/powermeter/$powermeterId/hapus',
)()
const authPengaturanPowermeterPowermeterIdEditLazyImport = createFileRoute(
  '/__auth/pengaturan/powermeter/$powermeterId/edit',
)()
const authPengaturanKampusKampusIdHapusLazyImport = createFileRoute(
  '/__auth/pengaturan/kampus/$kampusId/hapus',
)()
const authPengaturanKampusKampusIdEditLazyImport = createFileRoute(
  '/__auth/pengaturan/kampus/$kampusId/edit',
)()
const authPengaturanGedungGedungIdHapusLazyImport = createFileRoute(
  '/__auth/pengaturan/gedung/$gedungId/hapus',
)()
const authPengaturanGedungGedungIdEditLazyImport = createFileRoute(
  '/__auth/pengaturan/gedung/$gedungId/edit',
)()
const authPengaturanPowermeterPowermeterIdRegisterBaruLazyImport =
  createFileRoute('/__auth/pengaturan/powermeter/$powermeterId/register/baru')()
const authPengaturanPowermeterPowermeterIdRegisterRegisterIdHapusLazyImport =
  createFileRoute(
    '/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/hapus',
  )()
const authPengaturanPowermeterPowermeterIdRegisterRegisterIdEditLazyImport =
  createFileRoute(
    '/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/edit',
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

const authPengaturanLazyRoute = authPengaturanLazyImport
  .update({
    path: '/pengaturan',
    getParentRoute: () => authRoute,
  } as any)
  .lazy(() => import('./routes/__auth/pengaturan.lazy').then((d) => d.Route))

const authAboutLazyRoute = authAboutLazyImport
  .update({
    path: '/about',
    getParentRoute: () => authRoute,
  } as any)
  .lazy(() => import('./routes/__auth/about.lazy').then((d) => d.Route))

const authPerangkatRoute = authPerangkatImport.update({
  path: '/perangkat',
  getParentRoute: () => authRoute,
} as any)

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
    getParentRoute: () => authPerangkatRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/perangkat/baru.lazy').then((d) => d.Route),
  )

const authPerangkatPerangkatIdLazyRoute = authPerangkatPerangkatIdLazyImport
  .update({
    path: '/$perangkatId',
    getParentRoute: () => authPerangkatRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/perangkat/$perangkatId.lazy').then((d) => d.Route),
  )

const authPengaturanUnitLazyRoute = authPengaturanUnitLazyImport
  .update({
    path: '/unit',
    getParentRoute: () => authPengaturanLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/unit.lazy').then((d) => d.Route),
  )

const authPengaturanPowermeterLazyRoute = authPengaturanPowermeterLazyImport
  .update({
    path: '/powermeter',
    getParentRoute: () => authPengaturanLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/powermeter.lazy').then((d) => d.Route),
  )

const authPengaturanKampusLazyRoute = authPengaturanKampusLazyImport
  .update({
    path: '/kampus',
    getParentRoute: () => authPengaturanLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/kampus.lazy').then((d) => d.Route),
  )

const authPengaturanGedungLazyRoute = authPengaturanGedungLazyImport
  .update({
    path: '/gedung',
    getParentRoute: () => authPengaturanLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/gedung.lazy').then((d) => d.Route),
  )

const authPerangkatPerangkatIdLogsLazyRoute =
  authPerangkatPerangkatIdLogsLazyImport
    .update({
      path: '/logs',
      getParentRoute: () => authPerangkatPerangkatIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/perangkat/$perangkatId/logs.lazy').then(
        (d) => d.Route,
      ),
    )

const authPerangkatPerangkatIdHapusLazyRoute =
  authPerangkatPerangkatIdHapusLazyImport
    .update({
      path: '/hapus',
      getParentRoute: () => authPerangkatPerangkatIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/perangkat/$perangkatId/hapus.lazy').then(
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
      import('./routes/__auth/perangkat/$perangkatId/edit.lazy').then(
        (d) => d.Route,
      ),
    )

const authPerangkatPerangkatIdDataLazyRoute =
  authPerangkatPerangkatIdDataLazyImport
    .update({
      path: '/data',
      getParentRoute: () => authPerangkatPerangkatIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/perangkat/$perangkatId/data.lazy').then(
        (d) => d.Route,
      ),
    )

const authPerangkatPerangkatIdArsipLazyRoute =
  authPerangkatPerangkatIdArsipLazyImport
    .update({
      path: '/arsip',
      getParentRoute: () => authPerangkatPerangkatIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/perangkat/$perangkatId/arsip.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanUnitBaruLazyRoute = authPengaturanUnitBaruLazyImport
  .update({
    path: '/baru',
    getParentRoute: () => authPengaturanUnitLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/unit/baru.lazy').then((d) => d.Route),
  )

const authPengaturanUnitUnitIdLazyRoute = authPengaturanUnitUnitIdLazyImport
  .update({
    path: '/$unitId',
    getParentRoute: () => authPengaturanUnitLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/unit/$unitId.lazy').then((d) => d.Route),
  )

const authPengaturanPowermeterBaruLazyRoute =
  authPengaturanPowermeterBaruLazyImport
    .update({
      path: '/baru',
      getParentRoute: () => authPengaturanPowermeterLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/powermeter/baru.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanPowermeterPowermeterIdLazyRoute =
  authPengaturanPowermeterPowermeterIdLazyImport
    .update({
      path: '/$powermeterId',
      getParentRoute: () => authPengaturanPowermeterLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/powermeter/$powermeterId.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanKampusBaruLazyRoute = authPengaturanKampusBaruLazyImport
  .update({
    path: '/baru',
    getParentRoute: () => authPengaturanKampusLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/kampus.baru.lazy').then((d) => d.Route),
  )

const authPengaturanKampusKampusIdLazyRoute =
  authPengaturanKampusKampusIdLazyImport
    .update({
      path: '/$kampusId',
      getParentRoute: () => authPengaturanKampusLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/kampus/$kampusId.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanGedungBaruLazyRoute = authPengaturanGedungBaruLazyImport
  .update({
    path: '/baru',
    getParentRoute: () => authPengaturanGedungLazyRoute,
  } as any)
  .lazy(() =>
    import('./routes/__auth/pengaturan/gedung/baru.lazy').then((d) => d.Route),
  )

const authPengaturanGedungGedungIdLazyRoute =
  authPengaturanGedungGedungIdLazyImport
    .update({
      path: '/$gedungId',
      getParentRoute: () => authPengaturanGedungLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/gedung/$gedungId.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanUnitUnitIdHapusLazyRoute =
  authPengaturanUnitUnitIdHapusLazyImport
    .update({
      path: '/hapus',
      getParentRoute: () => authPengaturanUnitUnitIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/unit/$unitId.hapus.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanUnitUnitIdEditLazyRoute =
  authPengaturanUnitUnitIdEditLazyImport
    .update({
      path: '/edit',
      getParentRoute: () => authPengaturanUnitUnitIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/unit/$unitId.edit.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanPowermeterPowermeterIdRegisterLazyRoute =
  authPengaturanPowermeterPowermeterIdRegisterLazyImport
    .update({
      path: '/register',
      getParentRoute: () => authPengaturanPowermeterPowermeterIdLazyRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/__auth/pengaturan/powermeter/$powermeterId.register.lazy'
      ).then((d) => d.Route),
    )

const authPengaturanPowermeterPowermeterIdHapusLazyRoute =
  authPengaturanPowermeterPowermeterIdHapusLazyImport
    .update({
      path: '/hapus',
      getParentRoute: () => authPengaturanPowermeterPowermeterIdLazyRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/__auth/pengaturan/powermeter/$powermeterId.hapus.lazy'
      ).then((d) => d.Route),
    )

const authPengaturanPowermeterPowermeterIdEditLazyRoute =
  authPengaturanPowermeterPowermeterIdEditLazyImport
    .update({
      path: '/edit',
      getParentRoute: () => authPengaturanPowermeterPowermeterIdLazyRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/__auth/pengaturan/powermeter/$powermeterId.edit.lazy'
      ).then((d) => d.Route),
    )

const authPengaturanKampusKampusIdHapusLazyRoute =
  authPengaturanKampusKampusIdHapusLazyImport
    .update({
      path: '/hapus',
      getParentRoute: () => authPengaturanKampusKampusIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/kampus/$kampusId.hapus.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanKampusKampusIdEditLazyRoute =
  authPengaturanKampusKampusIdEditLazyImport
    .update({
      path: '/edit',
      getParentRoute: () => authPengaturanKampusKampusIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/kampus/$kampusId.edit.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanGedungGedungIdHapusLazyRoute =
  authPengaturanGedungGedungIdHapusLazyImport
    .update({
      path: '/hapus',
      getParentRoute: () => authPengaturanGedungGedungIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/gedung/$gedungId.hapus.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanGedungGedungIdEditLazyRoute =
  authPengaturanGedungGedungIdEditLazyImport
    .update({
      path: '/edit',
      getParentRoute: () => authPengaturanGedungGedungIdLazyRoute,
    } as any)
    .lazy(() =>
      import('./routes/__auth/pengaturan/gedung/$gedungId.edit.lazy').then(
        (d) => d.Route,
      ),
    )

const authPengaturanPowermeterPowermeterIdRegisterBaruLazyRoute =
  authPengaturanPowermeterPowermeterIdRegisterBaruLazyImport
    .update({
      path: '/baru',
      getParentRoute: () =>
        authPengaturanPowermeterPowermeterIdRegisterLazyRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/__auth/pengaturan/powermeter/$powermeterId.register.baru.lazy'
      ).then((d) => d.Route),
    )

const authPengaturanPowermeterPowermeterIdRegisterRegisterIdHapusLazyRoute =
  authPengaturanPowermeterPowermeterIdRegisterRegisterIdHapusLazyImport
    .update({
      path: '/$registerId/hapus',
      getParentRoute: () =>
        authPengaturanPowermeterPowermeterIdRegisterLazyRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/__auth/pengaturan/powermeter/$powermeterId.register.$registerId.hapus.lazy'
      ).then((d) => d.Route),
    )

const authPengaturanPowermeterPowermeterIdRegisterRegisterIdEditLazyRoute =
  authPengaturanPowermeterPowermeterIdRegisterRegisterIdEditLazyImport
    .update({
      path: '/$registerId/edit',
      getParentRoute: () =>
        authPengaturanPowermeterPowermeterIdRegisterLazyRoute,
    } as any)
    .lazy(() =>
      import(
        './routes/__auth/pengaturan/powermeter/$powermeterId.register.$registerId.edit.lazy'
      ).then((d) => d.Route),
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
    '/__auth/perangkat': {
      id: '/__auth/perangkat'
      path: '/perangkat'
      fullPath: '/perangkat'
      preLoaderRoute: typeof authPerangkatImport
      parentRoute: typeof authImport
    }
    '/__auth/about': {
      id: '/__auth/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof authAboutLazyImport
      parentRoute: typeof authImport
    }
    '/__auth/pengaturan': {
      id: '/__auth/pengaturan'
      path: '/pengaturan'
      fullPath: '/pengaturan'
      preLoaderRoute: typeof authPengaturanLazyImport
      parentRoute: typeof authImport
    }
    '/__auth/users': {
      id: '/__auth/users'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof authUsersLazyImport
      parentRoute: typeof authImport
    }
    '/__auth/pengaturan/gedung': {
      id: '/__auth/pengaturan/gedung'
      path: '/gedung'
      fullPath: '/pengaturan/gedung'
      preLoaderRoute: typeof authPengaturanGedungLazyImport
      parentRoute: typeof authPengaturanLazyImport
    }
    '/__auth/pengaturan/kampus': {
      id: '/__auth/pengaturan/kampus'
      path: '/kampus'
      fullPath: '/pengaturan/kampus'
      preLoaderRoute: typeof authPengaturanKampusLazyImport
      parentRoute: typeof authPengaturanLazyImport
    }
    '/__auth/pengaturan/powermeter': {
      id: '/__auth/pengaturan/powermeter'
      path: '/powermeter'
      fullPath: '/pengaturan/powermeter'
      preLoaderRoute: typeof authPengaturanPowermeterLazyImport
      parentRoute: typeof authPengaturanLazyImport
    }
    '/__auth/pengaturan/unit': {
      id: '/__auth/pengaturan/unit'
      path: '/unit'
      fullPath: '/pengaturan/unit'
      preLoaderRoute: typeof authPengaturanUnitLazyImport
      parentRoute: typeof authPengaturanLazyImport
    }
    '/__auth/perangkat/$perangkatId': {
      id: '/__auth/perangkat/$perangkatId'
      path: '/$perangkatId'
      fullPath: '/perangkat/$perangkatId'
      preLoaderRoute: typeof authPerangkatPerangkatIdLazyImport
      parentRoute: typeof authPerangkatImport
    }
    '/__auth/perangkat/baru': {
      id: '/__auth/perangkat/baru'
      path: '/baru'
      fullPath: '/perangkat/baru'
      preLoaderRoute: typeof authPerangkatBaruLazyImport
      parentRoute: typeof authPerangkatImport
    }
    '/__auth/users/register': {
      id: '/__auth/users/register'
      path: '/register'
      fullPath: '/users/register'
      preLoaderRoute: typeof authUsersRegisterLazyImport
      parentRoute: typeof authUsersLazyImport
    }
    '/__auth/pengaturan/gedung/$gedungId': {
      id: '/__auth/pengaturan/gedung/$gedungId'
      path: '/$gedungId'
      fullPath: '/pengaturan/gedung/$gedungId'
      preLoaderRoute: typeof authPengaturanGedungGedungIdLazyImport
      parentRoute: typeof authPengaturanGedungLazyImport
    }
    '/__auth/pengaturan/gedung/baru': {
      id: '/__auth/pengaturan/gedung/baru'
      path: '/baru'
      fullPath: '/pengaturan/gedung/baru'
      preLoaderRoute: typeof authPengaturanGedungBaruLazyImport
      parentRoute: typeof authPengaturanGedungLazyImport
    }
    '/__auth/pengaturan/kampus/$kampusId': {
      id: '/__auth/pengaturan/kampus/$kampusId'
      path: '/$kampusId'
      fullPath: '/pengaturan/kampus/$kampusId'
      preLoaderRoute: typeof authPengaturanKampusKampusIdLazyImport
      parentRoute: typeof authPengaturanKampusLazyImport
    }
    '/__auth/pengaturan/kampus/baru': {
      id: '/__auth/pengaturan/kampus/baru'
      path: '/baru'
      fullPath: '/pengaturan/kampus/baru'
      preLoaderRoute: typeof authPengaturanKampusBaruLazyImport
      parentRoute: typeof authPengaturanKampusLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId': {
      id: '/__auth/pengaturan/powermeter/$powermeterId'
      path: '/$powermeterId'
      fullPath: '/pengaturan/powermeter/$powermeterId'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdLazyImport
      parentRoute: typeof authPengaturanPowermeterLazyImport
    }
    '/__auth/pengaturan/powermeter/baru': {
      id: '/__auth/pengaturan/powermeter/baru'
      path: '/baru'
      fullPath: '/pengaturan/powermeter/baru'
      preLoaderRoute: typeof authPengaturanPowermeterBaruLazyImport
      parentRoute: typeof authPengaturanPowermeterLazyImport
    }
    '/__auth/pengaturan/unit/$unitId': {
      id: '/__auth/pengaturan/unit/$unitId'
      path: '/$unitId'
      fullPath: '/pengaturan/unit/$unitId'
      preLoaderRoute: typeof authPengaturanUnitUnitIdLazyImport
      parentRoute: typeof authPengaturanUnitLazyImport
    }
    '/__auth/pengaturan/unit/baru': {
      id: '/__auth/pengaturan/unit/baru'
      path: '/baru'
      fullPath: '/pengaturan/unit/baru'
      preLoaderRoute: typeof authPengaturanUnitBaruLazyImport
      parentRoute: typeof authPengaturanUnitLazyImport
    }
    '/__auth/perangkat/$perangkatId/arsip': {
      id: '/__auth/perangkat/$perangkatId/arsip'
      path: '/arsip'
      fullPath: '/perangkat/$perangkatId/arsip'
      preLoaderRoute: typeof authPerangkatPerangkatIdArsipLazyImport
      parentRoute: typeof authPerangkatPerangkatIdLazyImport
    }
    '/__auth/perangkat/$perangkatId/data': {
      id: '/__auth/perangkat/$perangkatId/data'
      path: '/data'
      fullPath: '/perangkat/$perangkatId/data'
      preLoaderRoute: typeof authPerangkatPerangkatIdDataLazyImport
      parentRoute: typeof authPerangkatPerangkatIdLazyImport
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
    '/__auth/perangkat/$perangkatId/logs': {
      id: '/__auth/perangkat/$perangkatId/logs'
      path: '/logs'
      fullPath: '/perangkat/$perangkatId/logs'
      preLoaderRoute: typeof authPerangkatPerangkatIdLogsLazyImport
      parentRoute: typeof authPerangkatPerangkatIdLazyImport
    }
    '/__auth/pengaturan/gedung/$gedungId/edit': {
      id: '/__auth/pengaturan/gedung/$gedungId/edit'
      path: '/edit'
      fullPath: '/pengaturan/gedung/$gedungId/edit'
      preLoaderRoute: typeof authPengaturanGedungGedungIdEditLazyImport
      parentRoute: typeof authPengaturanGedungGedungIdLazyImport
    }
    '/__auth/pengaturan/gedung/$gedungId/hapus': {
      id: '/__auth/pengaturan/gedung/$gedungId/hapus'
      path: '/hapus'
      fullPath: '/pengaturan/gedung/$gedungId/hapus'
      preLoaderRoute: typeof authPengaturanGedungGedungIdHapusLazyImport
      parentRoute: typeof authPengaturanGedungGedungIdLazyImport
    }
    '/__auth/pengaturan/kampus/$kampusId/edit': {
      id: '/__auth/pengaturan/kampus/$kampusId/edit'
      path: '/edit'
      fullPath: '/pengaturan/kampus/$kampusId/edit'
      preLoaderRoute: typeof authPengaturanKampusKampusIdEditLazyImport
      parentRoute: typeof authPengaturanKampusKampusIdLazyImport
    }
    '/__auth/pengaturan/kampus/$kampusId/hapus': {
      id: '/__auth/pengaturan/kampus/$kampusId/hapus'
      path: '/hapus'
      fullPath: '/pengaturan/kampus/$kampusId/hapus'
      preLoaderRoute: typeof authPengaturanKampusKampusIdHapusLazyImport
      parentRoute: typeof authPengaturanKampusKampusIdLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId/edit': {
      id: '/__auth/pengaturan/powermeter/$powermeterId/edit'
      path: '/edit'
      fullPath: '/pengaturan/powermeter/$powermeterId/edit'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdEditLazyImport
      parentRoute: typeof authPengaturanPowermeterPowermeterIdLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId/hapus': {
      id: '/__auth/pengaturan/powermeter/$powermeterId/hapus'
      path: '/hapus'
      fullPath: '/pengaturan/powermeter/$powermeterId/hapus'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdHapusLazyImport
      parentRoute: typeof authPengaturanPowermeterPowermeterIdLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId/register': {
      id: '/__auth/pengaturan/powermeter/$powermeterId/register'
      path: '/register'
      fullPath: '/pengaturan/powermeter/$powermeterId/register'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdRegisterLazyImport
      parentRoute: typeof authPengaturanPowermeterPowermeterIdLazyImport
    }
    '/__auth/pengaturan/unit/$unitId/edit': {
      id: '/__auth/pengaturan/unit/$unitId/edit'
      path: '/edit'
      fullPath: '/pengaturan/unit/$unitId/edit'
      preLoaderRoute: typeof authPengaturanUnitUnitIdEditLazyImport
      parentRoute: typeof authPengaturanUnitUnitIdLazyImport
    }
    '/__auth/pengaturan/unit/$unitId/hapus': {
      id: '/__auth/pengaturan/unit/$unitId/hapus'
      path: '/hapus'
      fullPath: '/pengaturan/unit/$unitId/hapus'
      preLoaderRoute: typeof authPengaturanUnitUnitIdHapusLazyImport
      parentRoute: typeof authPengaturanUnitUnitIdLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId/register/baru': {
      id: '/__auth/pengaturan/powermeter/$powermeterId/register/baru'
      path: '/baru'
      fullPath: '/pengaturan/powermeter/$powermeterId/register/baru'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdRegisterBaruLazyImport
      parentRoute: typeof authPengaturanPowermeterPowermeterIdRegisterLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/edit': {
      id: '/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/edit'
      path: '/$registerId/edit'
      fullPath: '/pengaturan/powermeter/$powermeterId/register/$registerId/edit'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdRegisterRegisterIdEditLazyImport
      parentRoute: typeof authPengaturanPowermeterPowermeterIdRegisterLazyImport
    }
    '/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/hapus': {
      id: '/__auth/pengaturan/powermeter/$powermeterId/register/$registerId/hapus'
      path: '/$registerId/hapus'
      fullPath: '/pengaturan/powermeter/$powermeterId/register/$registerId/hapus'
      preLoaderRoute: typeof authPengaturanPowermeterPowermeterIdRegisterRegisterIdHapusLazyImport
      parentRoute: typeof authPengaturanPowermeterPowermeterIdRegisterLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  authRoute: authRoute.addChildren({
    authPerangkatRoute: authPerangkatRoute.addChildren({
      authPerangkatPerangkatIdLazyRoute:
        authPerangkatPerangkatIdLazyRoute.addChildren({
          authPerangkatPerangkatIdArsipLazyRoute,
          authPerangkatPerangkatIdDataLazyRoute,
          authPerangkatPerangkatIdEditLazyRoute,
          authPerangkatPerangkatIdHapusLazyRoute,
          authPerangkatPerangkatIdLogsLazyRoute,
        }),
      authPerangkatBaruLazyRoute,
    }),
    authAboutLazyRoute,
    authPengaturanLazyRoute: authPengaturanLazyRoute.addChildren({
      authPengaturanGedungLazyRoute: authPengaturanGedungLazyRoute.addChildren({
        authPengaturanGedungGedungIdLazyRoute:
          authPengaturanGedungGedungIdLazyRoute.addChildren({
            authPengaturanGedungGedungIdEditLazyRoute,
            authPengaturanGedungGedungIdHapusLazyRoute,
          }),
        authPengaturanGedungBaruLazyRoute,
      }),
      authPengaturanKampusLazyRoute: authPengaturanKampusLazyRoute.addChildren({
        authPengaturanKampusKampusIdLazyRoute:
          authPengaturanKampusKampusIdLazyRoute.addChildren({
            authPengaturanKampusKampusIdEditLazyRoute,
            authPengaturanKampusKampusIdHapusLazyRoute,
          }),
        authPengaturanKampusBaruLazyRoute,
      }),
      authPengaturanPowermeterLazyRoute:
        authPengaturanPowermeterLazyRoute.addChildren({
          authPengaturanPowermeterPowermeterIdLazyRoute:
            authPengaturanPowermeterPowermeterIdLazyRoute.addChildren({
              authPengaturanPowermeterPowermeterIdEditLazyRoute,
              authPengaturanPowermeterPowermeterIdHapusLazyRoute,
              authPengaturanPowermeterPowermeterIdRegisterLazyRoute:
                authPengaturanPowermeterPowermeterIdRegisterLazyRoute.addChildren(
                  {
                    authPengaturanPowermeterPowermeterIdRegisterBaruLazyRoute,
                    authPengaturanPowermeterPowermeterIdRegisterRegisterIdEditLazyRoute,
                    authPengaturanPowermeterPowermeterIdRegisterRegisterIdHapusLazyRoute,
                  },
                ),
            }),
          authPengaturanPowermeterBaruLazyRoute,
        }),
      authPengaturanUnitLazyRoute: authPengaturanUnitLazyRoute.addChildren({
        authPengaturanUnitUnitIdLazyRoute:
          authPengaturanUnitUnitIdLazyRoute.addChildren({
            authPengaturanUnitUnitIdEditLazyRoute,
            authPengaturanUnitUnitIdHapusLazyRoute,
          }),
        authPengaturanUnitBaruLazyRoute,
      }),
    }),
    authUsersLazyRoute: authUsersLazyRoute.addChildren({
      authUsersRegisterLazyRoute,
    }),
  }),
  LoginRoute,
})

/* prettier-ignore-end */
