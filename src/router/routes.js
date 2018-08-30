
const routes = [
  { path: '/', component: () => import('pages/Index.vue') },
  { path: '/xor', component: () => import('pages/xor.vue') },
  { path: '/world', component: () => import('pages/world.vue') },
  { path: '/color', component: () => import('pages/color.vue') },
  { path: '/chatBot', component: () => import('pages/chatBot.vue') },
  { path: '/cloudVision', component: () => import('pages/cloudVision.vue') }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
