import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Allusers from "../pages/Dashboard/Allusers/Allusers";
import Employees from "../pages/Dashboard/Employees/Employees";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import HRHome from "../pages/Dashboard/HRHome/HRHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Payment from "../pages/Dashboard/Payment/Payment";
import PieChartEmployee from "../pages/Dashboard/HRHome/PieChart_employee";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('/Services.json')
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      {
path:'allusers',
element:<Allusers></Allusers>
      },
      {
        path:'employees',
        element:<Employees></Employees>
      },
      {
        path:'piechart',
        element:<PieChartEmployee></PieChartEmployee>
      },
      {
        path:'userhome',
        element:<UserHome></UserHome>
      },
      {
        path:'adminhome',
        element:<AdminHome></AdminHome>
      },
      {
        path:'hrhome',
        element:<HRHome></HRHome>
      }
    ]
  }
]);
