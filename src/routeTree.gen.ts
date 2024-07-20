/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IImport } from './routes/i'
import { Route as IIndexImport } from './routes/i/index'
import { Route as IProfileImport } from './routes/i/profile'
import { Route as ConnectAppNameImport } from './routes/connect/$appName'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ExampleAppIndexLazyImport = createFileRoute('/example-app/')()
const ConnectAppNameIndexLazyImport = createFileRoute('/connect/$appName/')()
const ConnectAppNameSignupLazyImport = createFileRoute(
  '/connect/$appName/signup',
)()
const ConnectAppNameSigninLazyImport = createFileRoute(
  '/connect/$appName/signin',
)()
const ConnectAppNameRecoveryLazyImport = createFileRoute(
  '/connect/$appName/recovery',
)()
const ConnectAppNameContinueLazyImport = createFileRoute(
  '/connect/$appName/continue',
)()

// Create/Update Routes

const IRoute = IImport.update({
  path: '/i',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ExampleAppIndexLazyRoute = ExampleAppIndexLazyImport.update({
  path: '/example-app/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/example-app.index.lazy').then((d) => d.Route),
)

const IIndexRoute = IIndexImport.update({
  path: '/',
  getParentRoute: () => IRoute,
} as any)

const IProfileRoute = IProfileImport.update({
  path: '/profile',
  getParentRoute: () => IRoute,
} as any)

const ConnectAppNameRoute = ConnectAppNameImport.update({
  path: '/connect/$appName',
  getParentRoute: () => rootRoute,
} as any)

const ConnectAppNameIndexLazyRoute = ConnectAppNameIndexLazyImport.update({
  path: '/',
  getParentRoute: () => ConnectAppNameRoute,
} as any).lazy(() =>
  import('./routes/connect/$appName/index.lazy').then((d) => d.Route),
)

const ConnectAppNameSignupLazyRoute = ConnectAppNameSignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => ConnectAppNameRoute,
} as any).lazy(() =>
  import('./routes/connect/$appName/signup.lazy').then((d) => d.Route),
)

const ConnectAppNameSigninLazyRoute = ConnectAppNameSigninLazyImport.update({
  path: '/signin',
  getParentRoute: () => ConnectAppNameRoute,
} as any).lazy(() =>
  import('./routes/connect/$appName/signin.lazy').then((d) => d.Route),
)

const ConnectAppNameRecoveryLazyRoute = ConnectAppNameRecoveryLazyImport.update(
  {
    path: '/recovery',
    getParentRoute: () => ConnectAppNameRoute,
  } as any,
).lazy(() =>
  import('./routes/connect/$appName/recovery.lazy').then((d) => d.Route),
)

const ConnectAppNameContinueLazyRoute = ConnectAppNameContinueLazyImport.update(
  {
    path: '/continue',
    getParentRoute: () => ConnectAppNameRoute,
  } as any,
).lazy(() =>
  import('./routes/connect/$appName/continue.lazy').then((d) => d.Route),
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
    '/i': {
      id: '/i'
      path: '/i'
      fullPath: '/i'
      preLoaderRoute: typeof IImport
      parentRoute: typeof rootRoute
    }
    '/connect/$appName': {
      id: '/connect/$appName'
      path: '/connect/$appName'
      fullPath: '/connect/$appName'
      preLoaderRoute: typeof ConnectAppNameImport
      parentRoute: typeof rootRoute
    }
    '/i/profile': {
      id: '/i/profile'
      path: '/profile'
      fullPath: '/i/profile'
      preLoaderRoute: typeof IProfileImport
      parentRoute: typeof IImport
    }
    '/i/': {
      id: '/i/'
      path: '/'
      fullPath: '/i/'
      preLoaderRoute: typeof IIndexImport
      parentRoute: typeof IImport
    }
    '/example-app/': {
      id: '/example-app/'
      path: '/example-app'
      fullPath: '/example-app'
      preLoaderRoute: typeof ExampleAppIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/connect/$appName/continue': {
      id: '/connect/$appName/continue'
      path: '/continue'
      fullPath: '/connect/$appName/continue'
      preLoaderRoute: typeof ConnectAppNameContinueLazyImport
      parentRoute: typeof ConnectAppNameImport
    }
    '/connect/$appName/recovery': {
      id: '/connect/$appName/recovery'
      path: '/recovery'
      fullPath: '/connect/$appName/recovery'
      preLoaderRoute: typeof ConnectAppNameRecoveryLazyImport
      parentRoute: typeof ConnectAppNameImport
    }
    '/connect/$appName/signin': {
      id: '/connect/$appName/signin'
      path: '/signin'
      fullPath: '/connect/$appName/signin'
      preLoaderRoute: typeof ConnectAppNameSigninLazyImport
      parentRoute: typeof ConnectAppNameImport
    }
    '/connect/$appName/signup': {
      id: '/connect/$appName/signup'
      path: '/signup'
      fullPath: '/connect/$appName/signup'
      preLoaderRoute: typeof ConnectAppNameSignupLazyImport
      parentRoute: typeof ConnectAppNameImport
    }
    '/connect/$appName/': {
      id: '/connect/$appName/'
      path: '/'
      fullPath: '/connect/$appName/'
      preLoaderRoute: typeof ConnectAppNameIndexLazyImport
      parentRoute: typeof ConnectAppNameImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  IRoute: IRoute.addChildren({ IProfileRoute, IIndexRoute }),
  ConnectAppNameRoute: ConnectAppNameRoute.addChildren({
    ConnectAppNameContinueLazyRoute,
    ConnectAppNameRecoveryLazyRoute,
    ConnectAppNameSigninLazyRoute,
    ConnectAppNameSignupLazyRoute,
    ConnectAppNameIndexLazyRoute,
  }),
  ExampleAppIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/i",
        "/connect/$appName",
        "/example-app/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/i": {
      "filePath": "i.tsx",
      "children": [
        "/i/profile",
        "/i/"
      ]
    },
    "/connect/$appName": {
      "filePath": "connect/$appName.tsx",
      "children": [
        "/connect/$appName/continue",
        "/connect/$appName/recovery",
        "/connect/$appName/signin",
        "/connect/$appName/signup",
        "/connect/$appName/"
      ]
    },
    "/i/profile": {
      "filePath": "i/profile.tsx",
      "parent": "/i"
    },
    "/i/": {
      "filePath": "i/index.tsx",
      "parent": "/i"
    },
    "/example-app/": {
      "filePath": "example-app.index.lazy.tsx"
    },
    "/connect/$appName/continue": {
      "filePath": "connect/$appName/continue.lazy.tsx",
      "parent": "/connect/$appName"
    },
    "/connect/$appName/recovery": {
      "filePath": "connect/$appName/recovery.lazy.tsx",
      "parent": "/connect/$appName"
    },
    "/connect/$appName/signin": {
      "filePath": "connect/$appName/signin.lazy.tsx",
      "parent": "/connect/$appName"
    },
    "/connect/$appName/signup": {
      "filePath": "connect/$appName/signup.lazy.tsx",
      "parent": "/connect/$appName"
    },
    "/connect/$appName/": {
      "filePath": "connect/$appName/index.lazy.tsx",
      "parent": "/connect/$appName"
    }
  }
}
ROUTE_MANIFEST_END */
