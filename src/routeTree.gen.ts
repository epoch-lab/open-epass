/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppNameImport } from './routes/$appName'
import { Route as AppNameIndexImport } from './routes/$appName.index'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ExampleIndexLazyImport = createFileRoute('/example/')()
const AppNameSignupLazyImport = createFileRoute('/$appName/signup')()
const AppNameSigninLazyImport = createFileRoute('/$appName/signin')()
const AppNameRecoveryLazyImport = createFileRoute('/$appName/recovery')()
const AppNameContinueLazyImport = createFileRoute('/$appName/continue')()

// Create/Update Routes

const AppNameRoute = AppNameImport.update({
  path: '/$appName',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ExampleIndexLazyRoute = ExampleIndexLazyImport.update({
  path: '/example/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/example.index.lazy').then((d) => d.Route))

const AppNameIndexRoute = AppNameIndexImport.update({
  path: '/',
  getParentRoute: () => AppNameRoute,
} as any)

const AppNameSignupLazyRoute = AppNameSignupLazyImport.update({
  path: '/signup',
  getParentRoute: () => AppNameRoute,
} as any).lazy(() =>
  import('./routes/$appName/signup.lazy').then((d) => d.Route),
)

const AppNameSigninLazyRoute = AppNameSigninLazyImport.update({
  path: '/signin',
  getParentRoute: () => AppNameRoute,
} as any).lazy(() =>
  import('./routes/$appName/signin.lazy').then((d) => d.Route),
)

const AppNameRecoveryLazyRoute = AppNameRecoveryLazyImport.update({
  path: '/recovery',
  getParentRoute: () => AppNameRoute,
} as any).lazy(() =>
  import('./routes/$appName/recovery.lazy').then((d) => d.Route),
)

const AppNameContinueLazyRoute = AppNameContinueLazyImport.update({
  path: '/continue',
  getParentRoute: () => AppNameRoute,
} as any).lazy(() =>
  import('./routes/$appName/continue.lazy').then((d) => d.Route),
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
    '/$appName': {
      id: '/$appName'
      path: '/$appName'
      fullPath: '/$appName'
      preLoaderRoute: typeof AppNameImport
      parentRoute: typeof rootRoute
    }
    '/$appName/continue': {
      id: '/$appName/continue'
      path: '/continue'
      fullPath: '/$appName/continue'
      preLoaderRoute: typeof AppNameContinueLazyImport
      parentRoute: typeof AppNameImport
    }
    '/$appName/recovery': {
      id: '/$appName/recovery'
      path: '/recovery'
      fullPath: '/$appName/recovery'
      preLoaderRoute: typeof AppNameRecoveryLazyImport
      parentRoute: typeof AppNameImport
    }
    '/$appName/signin': {
      id: '/$appName/signin'
      path: '/signin'
      fullPath: '/$appName/signin'
      preLoaderRoute: typeof AppNameSigninLazyImport
      parentRoute: typeof AppNameImport
    }
    '/$appName/signup': {
      id: '/$appName/signup'
      path: '/signup'
      fullPath: '/$appName/signup'
      preLoaderRoute: typeof AppNameSignupLazyImport
      parentRoute: typeof AppNameImport
    }
    '/$appName/': {
      id: '/$appName/'
      path: '/'
      fullPath: '/$appName/'
      preLoaderRoute: typeof AppNameIndexImport
      parentRoute: typeof AppNameImport
    }
    '/example/': {
      id: '/example/'
      path: '/example'
      fullPath: '/example'
      preLoaderRoute: typeof ExampleIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  AppNameRoute: AppNameRoute.addChildren({
    AppNameContinueLazyRoute,
    AppNameRecoveryLazyRoute,
    AppNameSigninLazyRoute,
    AppNameSignupLazyRoute,
    AppNameIndexRoute,
  }),
  ExampleIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/$appName",
        "/example/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/$appName": {
      "filePath": "$appName.tsx",
      "children": [
        "/$appName/continue",
        "/$appName/recovery",
        "/$appName/signin",
        "/$appName/signup",
        "/$appName/"
      ]
    },
    "/$appName/continue": {
      "filePath": "$appName/continue.lazy.tsx",
      "parent": "/$appName"
    },
    "/$appName/recovery": {
      "filePath": "$appName/recovery.lazy.tsx",
      "parent": "/$appName"
    },
    "/$appName/signin": {
      "filePath": "$appName/signin.lazy.tsx",
      "parent": "/$appName"
    },
    "/$appName/signup": {
      "filePath": "$appName/signup.lazy.tsx",
      "parent": "/$appName"
    },
    "/$appName/": {
      "filePath": "$appName.index.tsx",
      "parent": "/$appName"
    },
    "/example/": {
      "filePath": "example.index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
