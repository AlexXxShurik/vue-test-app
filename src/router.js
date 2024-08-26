// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import BookList from '@/components/BookList.vue';
import AddProduct from '@/components/AddProduct.vue';
import EditProduct from '@/components/EditProduct.vue';

const routes = [
  {
    path: '/',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/add',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/edit/:id',
    name: 'EditProduct',
    component: EditProduct
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
