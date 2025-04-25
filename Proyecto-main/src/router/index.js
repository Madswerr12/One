// Aqui esta el direccionamiento de las paginas desde usuarios autenticados y no
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/Cards",
    name: "Cards",
    component: Blogs,
    meta: {
      title: "Cards",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Post",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "Preview",
      requiresAuth: true,
  
    },
  },

  {
    path: "/Card:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "Card",
      requiresAuth: true,
    },
  },

  {
    path: "/Editar-Card/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "Editar-Card",
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | Iding`;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  const user = firebase.auth().currentUser;

  if (requiresAuth && !user) {
    next({ name: 'Login' });
  } else if (user) {
    try {
      // Obtener el rol del usuario desde Firestore
      const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();

      if (!userDoc.exists) {
        console.error("Documento del usuario no encontrado");
        next({ name: 'Home' });
        return;
      }

      const userData = userDoc.data();
    

      if (requiresAdmin && userData.role !== 'admin') {
        // Si la ruta requiere admin y el usuario no es admin
        next({ name: 'Home' });
      } else {
        next(); // Usuario autorizado
      }
    } catch (error) {
      console.error("Error al verificar el rol:", error);
      next({ name: 'Home' });
    }
  } else {
    next(); // Usuario no autenticado y no es una ruta protegida
  }
});

export default router;
