/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createServerRootRoute } from '@tanstack/react-start/server'

import { Route as rootRouteImport } from './routes/__root'
import { Route as AdminRouteImport } from './routes/_admin'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AdminLoginRouteImport } from './routes/admin.login'
import { Route as AdminAdminIndexRouteImport } from './routes/_admin/admin.index'
import { ServerRoute as ApiAuthSplatServerRouteImport } from './routes/api/auth/$'

const rootServerRouteImport = createServerRootRoute()

const AdminRoute = AdminRouteImport.update({
  id: '/_admin',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AdminLoginRoute = AdminLoginRouteImport.update({
  id: '/admin/login',
  path: '/admin/login',
  getParentRoute: () => rootRouteImport,
} as any)
const AdminAdminIndexRoute = AdminAdminIndexRouteImport.update({
  id: '/admin/',
  path: '/admin/',
  getParentRoute: () => AdminRoute,
} as any)
const ApiAuthSplatServerRoute = ApiAuthSplatServerRouteImport.update({
  id: '/api/auth/$',
  path: '/api/auth/$',
  getParentRoute: () => rootServerRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/admin/login': typeof AdminLoginRoute
  '/admin': typeof AdminAdminIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/admin/login': typeof AdminLoginRoute
  '/admin': typeof AdminAdminIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_admin': typeof AdminRouteWithChildren
  '/admin/login': typeof AdminLoginRoute
  '/_admin/admin/': typeof AdminAdminIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/admin/login' | '/admin'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/admin/login' | '/admin'
  id: '__root__' | '/' | '/_admin' | '/admin/login' | '/_admin/admin/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminRoute: typeof AdminRouteWithChildren
  AdminLoginRoute: typeof AdminLoginRoute
}
export interface FileServerRoutesByFullPath {
  '/api/auth/$': typeof ApiAuthSplatServerRoute
}
export interface FileServerRoutesByTo {
  '/api/auth/$': typeof ApiAuthSplatServerRoute
}
export interface FileServerRoutesById {
  __root__: typeof rootServerRouteImport
  '/api/auth/$': typeof ApiAuthSplatServerRoute
}
export interface FileServerRouteTypes {
  fileServerRoutesByFullPath: FileServerRoutesByFullPath
  fullPaths: '/api/auth/$'
  fileServerRoutesByTo: FileServerRoutesByTo
  to: '/api/auth/$'
  id: '__root__' | '/api/auth/$'
  fileServerRoutesById: FileServerRoutesById
}
export interface RootServerRouteChildren {
  ApiAuthSplatServerRoute: typeof ApiAuthSplatServerRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      id: '/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdminRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/admin/login': {
      id: '/admin/login'
      path: '/admin/login'
      fullPath: '/admin/login'
      preLoaderRoute: typeof AdminLoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_admin/admin/': {
      id: '/_admin/admin/'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAdminIndexRouteImport
      parentRoute: typeof AdminRoute
    }
  }
}
declare module '@tanstack/react-start/server' {
  interface ServerFileRoutesByPath {
    '/api/auth/$': {
      id: '/api/auth/$'
      path: '/api/auth/$'
      fullPath: '/api/auth/$'
      preLoaderRoute: typeof ApiAuthSplatServerRouteImport
      parentRoute: typeof rootServerRouteImport
    }
  }
}

interface AdminRouteChildren {
  AdminAdminIndexRoute: typeof AdminAdminIndexRoute
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminAdminIndexRoute: AdminAdminIndexRoute,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  AdminLoginRoute: AdminLoginRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
const rootServerRouteChildren: RootServerRouteChildren = {
  ApiAuthSplatServerRoute: ApiAuthSplatServerRoute,
}
export const serverRouteTree = rootServerRouteImport
  ._addFileChildren(rootServerRouteChildren)
  ._addFileTypes<FileServerRouteTypes>()
