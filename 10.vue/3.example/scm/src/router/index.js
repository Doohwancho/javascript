import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Management/Notice.vue';
import UserInfo from '../views/Management/UserInfo.vue';
import SupplierInfo from '../views/Management/SupplierInfo.vue';
import Inquiry from '../views/Management/Inquiry.vue';

import ShoppingOrders from '../views/Trade/ShoppingOrders.vue';
import TasksShopping from '../views/Tasks/TasksShopping.vue';
import TasksOrders from '../views/Tasks/TasksOrders.vue';
import ShoppingReturnList from '../views/Trade/ShoppingReturnList.vue';
import Inventory from '../views/Trade/Inventory.vue';
import TasksShoppingReturn from '../views/Tasks/TasksShoppingReturn.vue';
import Sinquiry from '../views/Support/Sinquiry.vue';

import DeliveryShoppingReturnList from '../views/Delivery/ShoppingReturnList.vue';
import ShoppingList from '../views/Delivery/ShoppingList.vue';
import CommonCode from '../views/Management/CommonCode.vue';
import TasksOrdersList from '../views/Tasks/TasksOrdersList.vue';
import TasksOrdersReturnList from '../views/Tasks/TasksOrdersReturnList.vue';
import ProductInfo from '../views/Management/ProductInfo.vue';
import Performance from '../views/Sales/Performance.vue';
import TopSales from '../views/Sales/TopSales.vue';
import ProfitCheck from '../views/Sales/ProfitCheck.vue';
import DeliveryOrdersList from '../views/Delivery/DeliveryOrdersList.vue';
import WarehouseInfo from '../views/Management/WarehouseInfo.vue';
import DeliveryOrdersReturnList from '../views/Delivery/DeliveryOrdersReturnList.vue';
import Products from '../views/Mall/Products.vue';
import Cart from '../views/Mall/Cart.vue';
import History from '../views/Mall/History.vue';
import ApprovalOrders from '../views/Approval/ApprovalOrders.vue';
import ApprovalShoppingReturn from '../views/Approval/ApprovalShoppingReturn.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/vue',
        name: 'vue',
        component: DashBoard,
        children: [
            {
                path: 'management',
                name: 'management',
                children: [
                    {
                        path: 'notice',
                        name: 'notice',
                        component: Notice,
                    },
                    {
                        path: 'user-info',
                        name: 'user-info',
                        component: UserInfo,
                    },
                    {
                        path: 'supplier-info',
                        name: 'supplier-info',
                        component: SupplierInfo,
                    },
                    {
                        path: 'inquiry',
                        name: 'inquiry',
                        component: Inquiry,
                    },
                    {
                        path: 'common-code',
                        name: 'common-code',
                        component: CommonCode,
                    },
                    {
                        path: 'product-info',
                        name: 'product-info',
                        component: ProductInfo,
                    },
                    {
                        path: 'warehouse-info',
                        name: 'warehouse-info',
                        component: WarehouseInfo,
                    },
                ],
            },
            {
                path: 'trade',
                name: 'trade',
                children: [
                    {
                        path: 'shopping-orders',
                        name: 'shopping-orders',
                        component: ShoppingOrders,
                    },
                    {
                        path: 'shopping-return-list',
                        name: 'trade-shopping-return-list',
                        component: ShoppingReturnList,
                    },
                    {
                        path: 'inventory',
                        name: 'inventory',
                        component: Inventory,
                    },
                ],
            },
            {
                path: 'tasks',
                name: 'tasks',
                children: [
                    {
                        path: 'shopping',
                        name: 'shopping',
                        component: TasksShopping,
                    },
                    {
                        path: 'orders',
                        name: 'tasks-orders',
                        component: TasksOrders,
                    },
                    {
                        path: 'shopping-return',
                        name: 'shopping-return',
                        component: TasksShoppingReturn,
                    },
                    {
                        path: 'orders-list',
                        name: 'orders-list',
                        component: TasksOrdersList,
                    },
                    {
                        path: 'orders-return-list',
                        name: 'tasks-orders-return-list',
                        component: TasksOrdersReturnList,
                    },
                ],
            },
            {
                path: 'delivery',
                name: 'delivery',
                children: [
                    {
                        path: 'shopping-list',
                        name: 'shopping-list',
                        component: ShoppingList,
                    },
                    {
                        path: 'shopping-return-list',
                        name: 'delivery-shopping-return-list',
                        component: DeliveryShoppingReturnList,
                    },
                    {
                        path: 'orders-list',
                        name: 'delivery-orders-list',
                        component: DeliveryOrdersList,
                    },
                    {
                        path: 'orders-return-list',
                        name: 'orders-return-list',
                        component: DeliveryOrdersReturnList,
                    },
                ],
            },
            {
                path: 'support',
                name: 'support',
                children: [
                    {
                        path: 'inquiry',
                        name: 'sinquiry',
                        component: Sinquiry,
                    },
                ],
            },
            {
                path: 'sales',
                name: 'sales',
                children: [
                    {
                        path: 'performance',
                        name: 'performance',
                        component: Performance,
                    },
                    {
                        path: 'top-sales',
                        name: 'top-sales',
                        component: TopSales,
                    },
                    {
                        path: 'profit-check',
                        name: 'profit-check',
                        component: ProfitCheck,
                    },
                ],
            },
            {
                path: 'mall',
                name: 'mall',
                children: [
                    {
                        path: 'products',
                        name: 'products',
                        component: Products,
                    },
                    {
                        path: 'cart',
                        name: 'cart',
                        component: Cart,
                    },
                    {
                        path: 'history',
                        name: 'history',
                        component: History,
                    },
                ],
            },
            {
                path: 'approval',
                name: 'approval',
                children: [
                    {
                        path: 'orders',
                        name: 'approval-orders',
                        component: ApprovalOrders,
                    },
                    {
                        path: 'shopping-return',
                        name: 'approval-shopping-return',
                        component: ApprovalShoppingReturn,
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
