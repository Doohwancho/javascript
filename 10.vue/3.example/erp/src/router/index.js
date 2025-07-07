import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/System/Notice.vue';
import Manage from '../views/Account/Manage.vue';
import Department from '../views/System/Department.vue';
import SalaryList from '../views/Personnel/Salary/Salary-list.vue';
import Daily from '../views/Sales/Daily.vue';
import Monthly from '../views/Sales/Monthly.vue';
import Employee from '../views/Personnel/Employee/Employee.vue';
import ExpenseList from '../views/Account/ExpenseList.vue';
import Promotion from '../views/Personnel/Promotion/Promotion.vue';
import Annual from '../views/Sales/annual.vue';
import ReceivablesList from '../views/Sales/ReceivablesList.vue';
import Plan from '../views/Business/Plan/Plan.vue';
import ExpenseReviewList from '../views/Account/ExpenseReviewList.vue';
import PlanResult from '../views/Business/PlanResult/PlanResult.vue';
import Estimate from '../views/Business/Estimate/Estimate.vue';
import Code from '../views/System/Code.vue';
import ExpenseReviewListPrint from '../components/page/Account/ExpenseReviewList/ExpenseReviewListPrint.vue';
import SalaryManage from '../views/Personnel/Salary/Salary-manage.vue';
import AttendanceList from '../views/Personnel/Attendance/Attendance-list.vue';
import ExpenseApproval from '../views/Account/ExpenseApproval.vue';
import AttendanceRequest from '../views/Personnel/Attendance/Attendance-request.vue';
import Order from '../views/Business/Order/Order.vue';
import AttendanceApproval from '../views/Personnel/Attendance/Attendance-approval.vue';
import ClientList from '../views/Business/ClientList/ClientList.vue';
import VocherList from '../views/Account/VoucherList.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/expense-review/print/:id',
        name: 'expense-review-print',
        component: ExpenseReviewListPrint,
    },
    {
        path: '/vue',
        name: 'vue',
        component: DashBoard,
        children: [
            {
                path: 'system',
                name: 'system',
                children: [
                    {
                        path: 'notice',
                        name: 'notice',
                        component: Notice,
                    },
                    {
                        path: 'department',
                        name: 'department',
                        component: Department,
                    },
                    {
                        path: 'code',
                        name: 'code',
                        component: Code,
                    },
                ],
            },
            {
                path: 'personnel',
                name: 'personnel',
                children: [
                    {
                        path: 'salary-list',
                        name: 'salary-list',
                        component: SalaryList,
                    },
                    {
                        path: 'salary-manage',
                        name: 'salary-manage',
                        component: SalaryManage,
                    },
                    {
                        path: 'employee',
                        name: 'employee',
                        component: Employee,
                    },
                    {
                        path: 'promotion',
                        name: 'promotion',
                        component: Promotion,
                    },
                    {
                        path: 'attendance-list',
                        name: 'attendance-list',
                        component: AttendanceList,
                    },
                    {
                        path: 'attendance-request',
                        name: 'attendance-request',
                        component: AttendanceRequest,
                    },
                    {
                        path: 'attendance-approval',
                        name: 'attendance-approval',
                        component: AttendanceApproval,
                    },
                ],
            },
            {
                path: 'sales',
                name: 'sales',
                children: [
                    {
                        path: 'daily',
                        name: 'daily',
                        component: Daily,
                    },
                    {
                        path: 'monthly',
                        name: 'monthly',
                        component: Monthly,
                    },
                    {
                        path: 'annual',
                        name: 'annual',
                        component: Annual,
                    },
                    {
                        path: 'receivables-list',
                        name: 'receivables-list',
                        component: ReceivablesList,
                    },
                ],
            },
            {
                path: 'account',
                name: 'account',
                children: [
                    {
                        path: 'sales-plan',
                        name: 'sales-plan',
                        component: Plan,
                    },
                    {
                        path: 'expense-review',
                        name: 'expense-review',
                        component: ExpenseReviewList,
                    },
                    {
                        path: 'manage',
                        name: 'manage',
                        component: Manage,
                    },
                    {
                        path: 'expense-list',
                        name: 'expense-list',
                        component: ExpenseList,
                    },
                    {
                        path: 'expense-review',
                        name: 'expense-review',
                        component: ExpenseReviewList,
                    },
                    {
                        path: 'expense-approval',
                        name: 'expense-approval',
                        component: ExpenseApproval,
                    },
                    {
                        path: 'voucher-list',
                        name: 'voucher-list',
                        component: VocherList,
                    },
                ],
            },
            {
                path: 'business',
                name: 'business',
                children: [
                    {
                        path: 'sales-plan',
                        name: 'sales-plan',
                        component: Plan,
                    },
                    {
                        path: 'sales-list',
                        name: 'sales-list',
                        component: PlanResult,
                    },
                    {
                        path: 'estimate-list',
                        name: 'estimate-list',
                        component: Estimate,
                    },
                    {
                        path: 'order-information-list',
                        name: 'order-information-list',
                        component: Order,
                    },
                    {
                        path: 'client-list',
                        name: 'client-list',
                        component: ClientList,
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
