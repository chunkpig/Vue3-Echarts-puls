import router from './router';
router.beforeEach((to,form,next) => {
  if (to.path == '/login') {
    next();
  } else {
    next('/login');
  }
})