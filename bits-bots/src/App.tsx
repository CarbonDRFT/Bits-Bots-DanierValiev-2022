import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfoPage from './pages/ProductInfoPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import AllProductsPage from './pages/admin/AllProductsPage';
import AllOrdersPage from './pages/admin/AllOrdersPage';
import AllUsersPage from './pages/admin/AllUsersPage';
import NotFoundPage from './pages/NotFoundPage';

import type { RootState } from './redux/store';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/reset.scss';
import './styles/main.scss';
import './styles/colors.scss';
import './styles/constants.scss';
import './styles/animations.scss';
import './styles/shadows.scss';
import './styles/auth.scss';
import './styles/modals.scss';

const App = (): JSX.Element => {
  const { darkThemeEnabled } = useSelector((state: RootState) => state.ui);

  return (
    <div className={`app-wrap ${darkThemeEnabled ? 'dark-theme' : ''}`}>
      <ToastContainer
        autoClose={1500}
        theme={darkThemeEnabled ? 'dark' : 'light'}
      />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={<HomePage />} fallbackPath="/login" />}
        />
        <Route
          path="/page/:page"
          element={<ProtectedRoute element={<HomePage />} fallbackPath="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/product/:id"
          element={<ProtectedRoute element={<ProductInfoPage />} fallbackPath="/login" />}
        />
        <Route
          path="/cart"
          element={<ProtectedRoute element={<CartPage />} fallbackPath="/login" />}
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<OrdersPage />} fallbackPath="/login" />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<CheckoutPage />} fallbackPath="/login" />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPage />} fallbackPath="/login" />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute element={<AllProductsPage />} fallbackPath="/login" />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute element={<AllOrdersPage />} fallbackPath="/login" />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<AllUsersPage />} fallbackPath="/login" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

type ProtectedRouteProps = {
  element: JSX.Element;
  fallbackPath: string;
};

export const ProtectedRoute = ({ element, fallbackPath }: ProtectedRouteProps): JSX.Element => {
  return localStorage.getItem('currentUser') ? element : <Navigate to={fallbackPath} />;
};

export default App;
