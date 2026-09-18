import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ================= USER PAGES =================
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

// ================= USER COMPONENTS =================
import Contact from "./components/Contact";

// ================= ADMIN PAGES =================
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Categories from "./admin/Categories";
import Products from "./admin/Products";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AddCategory from "./admin/AddCategory";
import AdminLogin from "./pages/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>

        {/* ================= USER ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<CartPage />} />
        
        <Route path="/wishlist" element={<WishlistPage />} />


        {/* ================= ADMIN LOGIN ================= */}

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin/login" element={<AdminLogin />} />


        {/* ================= ADMIN ROUTES ================= */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="categories"
            element={<Categories />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          <Route
            path="products/add"
            element={<AddProduct />}
          />

          <Route
            path="add-category"
            element={<AddCategory />}
          />

          <Route
            path="categories/add"
            element={<AddCategory />}
          />

          <Route
            path="products/edit/:id"
            element={<EditProduct />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}