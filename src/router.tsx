import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { queryClient } from './utils/queryClient'


export function getRouter() {
  const router = createRouter({
    routeTree,
    context: {
      queryClient,
    },
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
