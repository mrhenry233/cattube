import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyVideoPage from "./pages/MyVideosPage";
import PlayVideo from "./pages/PlayVideo";
import UploadVideoPage from "./pages/UploadVideoPage";

const routes = [
  {
    path: '/',
    component: <HomePage />
  },
  {
    path: '/login',
    component: <LoginPage />
  },
  {
    path: '/my-videos',
    component: <MyVideoPage />
  },
  {
    path: '/upload',
    component: <UploadVideoPage />
  },
  {
    path: '/video/:id',
    component: <PlayVideo />
  },
];

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}