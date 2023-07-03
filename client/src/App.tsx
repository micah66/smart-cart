import { RouterProvider } from '@tanstack/router'

import router from './routes'

export default function App() {
  return <RouterProvider router={router} />
}
