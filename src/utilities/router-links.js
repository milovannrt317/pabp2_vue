import { createWebHistory, createRouter } from "vue-router";
import ProductTable from "../components/ProductTable.vue";
import CategoryTable from "../components/CategoryTable.vue";
import Home from "../components/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "ProductTable",
    component: ProductTable,
  },
  {
    path: "/categories",
    name: "CategoryTable",
    component: CategoryTable,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;