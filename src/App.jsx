import "./App.css";
import "keen-slider/keen-slider.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import useUserStore from "./store/userStore";
import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import AdminPage from "./pages/AdminPage";
import Products from "./components/AdminDashboard/Products/Products";
import Brands from "./components/AdminDashboard/Brands/Brands";
import CreateProduct from "./components/AdminDashboard/Products/CreateProduct/CreateProduct";
import CreateBrand from "./components/AdminDashboard/Brands/CreateBrand/CreateBrand";
import useBrandStore from "./store/brandStore";
import useProductStore from "./store/productStore";
import RootLayout from "./components/RootLayout/RootLayout";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const { getUser } = useUserStore();
  const { getBrands } = useBrandStore();
  const { getProducts } = useProductStore();

  useEffect(() => {
    getUser();
    getBrands();
    getProducts();
  }, [getUser, getBrands, getProducts]);

  return (
    <>
      <BrowserRouter>
        <ConfirmationModal />
        <GlobalSnackbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RootLayout>
                <HomePage />
              </RootLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <RootLayout>
                <ProductDetailsPage />
              </RootLayout>
            }
          />
          <Route path="/admin/*" element={<AdminPage />}>
            <Route path="products" element={<Products />} />
            <Route path="brands" element={<Brands />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="create-brand" element={<CreateBrand />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
