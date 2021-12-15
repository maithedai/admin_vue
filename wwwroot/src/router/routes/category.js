import category from '@/views/category/index'
import AddCategory from '@/views/category/AddCategory.vue'

export default [
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/add_category',
      name: 'AddCategory',
      component: AddCategory,
    },
]