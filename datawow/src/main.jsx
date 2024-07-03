import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import Signin from './pages/Signin/Signin.jsx'
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import EditDeletePost from './pages/EditDeletePost/EditDeletePost.jsx';
import PostDetail from './pages/PostDetail/PostDetail.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path:"/",
        element:<Homepage/>,
      },
      {
        path:"/signin",
        element:<Signin/>,
      },
      {
        path:"/createpost",
        element:<CreatePost/>,
      },
      {
        path:"/editdeletepost",
        element:<EditDeletePost/>,
      },
      {
        path:"/postdetail",
        element:<PostDetail/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
