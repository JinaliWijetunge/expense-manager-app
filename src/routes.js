
import DefaultLayout from "./layouts/DefaultLayout"
import LoginLayout from "./layouts/LoginLayout"
import AllBudget from "./views/Budget/AllBudget";
import AllCategories from "./views/Categories/AllCategories";
import HomeView from "./views/Home/HomeView";
import Login from "./views/Login/Login";
import AllTransactions from "./views/Transaction/AllTransactions";

const routes = [
    {
        path: `/`,
        exact: true,
        layout: DefaultLayout,
        component: HomeView,
    },
    {
        path: `/categories`,
        exact: true,
        layout: DefaultLayout,
        component: AllCategories,
    },
    {
        path: `/transactions`,
        exact: true,
        layout: DefaultLayout,
        component: AllTransactions,
    },
    {
        path: `/budget`,
        exact: true,
        layout: DefaultLayout,
        component: AllBudget,
    },
    {
        path: `/login`,
        exact: true,
        layout: LoginLayout,
        component: Login,
    }
]

export default routes;