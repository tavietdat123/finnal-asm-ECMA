import Navigo from "navigo"
import SignIn from "./src/pages/Auth/SignIn"
import SignUp from "./src/pages/Auth/SignUp"
import DetailProductPage from "./src/pages/DetailProduct"
import HomePage from "./src/pages/HomePage"
import ProductPage from "./src/pages/ProductPage"
import LayoutUser from "./src/Layout/LayoutUser"
import notFound from "./src/pages/Notfound"
import LayoutAdmin from "./src/Layout/LayoutAdmin"
import AdminProductPage from "./src/pages/admin/AdminProductPage"
import AddProductPage from "./src/pages/admin/AdminProductPage/AddProductPage"
import AdminCategoryPage from "./src/pages/admin/AdminCategoryPage"
import AddCategoryPage from "./src/pages/admin/AdminCategoryPage/AddCategoryPage"
import EditCategoryPage from "./src/pages/admin/AdminCategoryPage/EditCategoryPage"
import EditProductPage from "./src/pages/admin/AdminProductPage/EditProductPage"
import AdminUserPage from "./src/pages/admin/AdminUserPage"
import AddUserPage from "./src/pages/admin/AdminUserPage/AddUserPage"
import EditUserPage from "./src/pages/admin/AdminUserPage/EditUserPage"

export const router = new Navigo("/")
const app = document.querySelector('#app')
export const menus = [
    { path: '/', component: HomePage, name: 'Homepage' },
    { path: '/product', component: ProductPage, name: 'Detail Product' },
    { path: '/product/:id', component: DetailProductPage, name: 'Product' },
    { path: '/sign-in', component: SignIn, name: "Sign in" },
    { path: '/sign-up', component: SignUp, name: "Sign up" }
]
export const admin = [
    { path: '/admin/dashboard', component: () => '' },
    { path: '/admin/product', component: AdminProductPage },
    { path: '/admin/product/add', component: AddProductPage },
    { path: '/admin/product/update/:id', component: EditProductPage },
    { path: '/admin/category', component: AdminCategoryPage },
    { path: '/admin/category/add', component: AddCategoryPage },
    { path: '/admin/category/update/:id', component: EditCategoryPage },
    { path: '/admin/user', component: AdminUserPage },
    { path: '/admin/user/add', component: AddUserPage },
    { path: '/admin/user/update/:id', component: EditUserPage },
]
const render = (component, ref) => {
    return ref.innerHTML = component
}
menus.forEach(el => {
    router.on(el.path, (params) => render(LayoutUser(el.component, params), app))

})
admin.forEach(el => {
    router.on(el.path, (params) => render(LayoutAdmin(el.component, params), app))

})


router.notFound(render(notFound(), app));
router.resolve();