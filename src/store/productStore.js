import { create } from "zustand";
import clientAxios from "../utils/clientAxios";

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  getProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.get("/products/");
      set({ products: data.products, loading: false });
    } catch (error) {
      set({ products: [], loading: false });
      throw error;
    }
  },

  getProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.get(`/products/get/${id}`);
      set({ product: data.product, loading: false });
    } catch (error) {
      set({ product: null, loading: false });
      throw error;
    }
  },

  createProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.post("/products/create", product);

      const newProduct = data.product;

      set((state) => ({
        loading: false,
        products: [...state.products, newProduct],
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateProduct: async ({ id, ...product }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.put(`/products/update/${id}`, product);

      const updatedProduct = data.product;

      set((state) => ({
        loading: false,
        products: state.products.map((product) =>
          product._id === id ? updatedProduct : product
        ),
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await clientAxios.delete(`/products/delete/${id}`);
      set((state) => ({
        loading: false,
        products: state.products.filter((product) => product._id !== id),
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));

export default useProductStore;
