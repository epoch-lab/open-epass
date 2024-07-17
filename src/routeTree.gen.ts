/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppNameImport } from './routes/$appName'
import { Route as AppNameSignupImport } from './routes/$appName/signup'
import { Route as AppNameSigninImport } from './routes/$appName/signin'
import { Route as AppNameRecoveryImport } from './routes/$appName/recovery'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ExampleIndexLazyImport = createFileRoute('/example/')()

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

const AppNameSignupRoute = AppNameSignupImport.update({
  path: '/signup',
  getParentRoute: () => AppNameRoute,
} as any)

const AppNameSigninRoute = AppNameSigninImport.update({
  path: '/signin',
  getParentRoute: () => AppNameRoute,
} as any)

const AppNameRecoveryRoute = AppNameRecoveryImport.update({
  path: '/recovery',
  getParentRoute: () => AppNameRoute,
} as any)

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
    '/$appName/recovery': {
      id: '/$appName/recovery'
      path: '/recovery'
      fullPath: '/$appName/recovery'
      preLoaderRoute: typeof AppNameRecoveryImport
      parentRoute: typeof AppNameImport
    }
    '/$appName/signin': {
      id: '/$appName/signin'
      path: '/signin'
      fullPath: '/$appName/signin'
      preLoaderRoute: typeof AppNameSigninImport
      parentRoute: typeof AppNameImport
    }
    '/$appName/signup': {
      id: '/$appName/signup'
      path: '/signup'
      fullPath: '/$appName/signup'
      preLoaderRoute: typeof AppNameSignupImport
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
    AppNameRecoveryRoute,
    AppNameSigninRoute,
    AppNameSignupRoute,
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
        "/$appName/recovery",
        "/$appName/signin",
        "/$appName/signup"
      ]
    },
    "/$appName/recovery": {
      "filePath": "$appName/recovery.tsx",
      "parent": "/$appName"
    },
    "/$appName/signin": {
      "filePath": "$appName/signin.tsx",
      "parent": "/$appName"
    },
    "/$appName/signup": {
      "filePath": "$appName/signup.tsx",
      "parent": "/$appName"
    },
    "/example/": {
      "filePath": "example.index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */