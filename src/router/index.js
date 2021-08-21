import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "aws-amplify";
import Home from "../views/Home.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      redirectToProfilePageIfLoggedIn: true,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: {
      async beforeRouteEnter(to, from, next) {
        try {
          await Auth.signOut();
        } catch (error) {
          console.log("error signing out: ", error);
        }

        next({ name: "Login" });
      },
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      redirectToLoginPageIfSignedOut: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["isAuthenticated"];

  if (to.matched.some((record) => record.meta.redirectToLoginPageIfSignedOut)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAuthenticated) {
      next({
        name: "Login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (
    to.matched.some((record) => record.meta.redirectToProfilePageIfLoggedIn)
  ) {
    if (isAuthenticated) {
      next({
        name: "Profile",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
