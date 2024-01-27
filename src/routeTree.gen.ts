// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './view/routes/__root'
import { Route as UserImport } from './view/routes/user'
import { Route as IndexImport } from './view/routes/index'
import { Route as UserUserIdImport } from './view/routes/user.$userId'

// Create/Update Routes

const UserRoute = UserImport.update({
  path: '/user',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserUserIdRoute = UserUserIdImport.update({
  path: '/$userId',
  getParentRoute: () => UserRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/user': {
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/user/$userId': {
      preLoaderRoute: typeof UserUserIdImport
      parentRoute: typeof UserImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  UserRoute.addChildren([UserUserIdRoute]),
])
