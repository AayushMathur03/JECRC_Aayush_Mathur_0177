import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DashboardHome from "../pages/dashboard/DashboardHome";
import Analytics from "../pages/dashboard/Analytics";
import Settings from "../pages/dashboard/Settings";

import ProductList from "../pages/products/ProductList";
import ProductDetails from "../pages/products/ProductDetails";
import Reviews from "../pages/products/Reviews";
import Specs from "../pages/products/Specs";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* DASHBOARD (PROTECTED) */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* PRODUCTS */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />}>
          <Route path="reviews" element={<Reviews />} />
          <Route path="specs" element={<Specs />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;