import {
  Outlet,
  Router,
  Route,
  RootRoute,
  createHashHistory,
} from '@tanstack/router'
import Root from './components/root'
import MyCart from './components/myCart'

const rootRoute = new RootRoute({
  component: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#01579b',
      }}
    >
      <Root />
      <Outlet />
    </div>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div>
      <h1>Home Page</h1>
    </div>
  ),
})

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: () => (
    <div>
      <h1>About Page</h1>
    </div>
  ),
})

const myCartRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/my-cart',
  component: MyCart,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, myCartRoute])

const router = new Router({ routeTree, history: createHashHistory() })

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

export default router
