import { create } from "zustand";
import clientAxios from "../utils/clientAxios";

const useBrandStore = create((set) => ({
  brands: [],
  loading: false,
  error: null,
  getBrands: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.get("/brands/");
      set({ brands: data.brands, loading: false });
    } catch (error) {
      set({ brands: [], loading: false });
      throw error;
    }
  },
  createBrand: async ({ name, logo_url }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.post("/brands/create", {
        name,
        logo_url,
      });
      const newBrand = data.brand;
      set((state) => ({
        loading: false,
        brands: [...state.brands, newBrand],
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateBrand: async ({ id, name, logo_url }) => {
    set({ loading: true, error: null });
    try {
      const { data } = await clientAxios.put(`/brands/update/${id}`, {
        name,
        logo_url,
      });
      const updatedBrand = data.brand;
      set((state) => ({
        loading: false,
        brands: state.brands.map((brand) =>
          brand._id === id ? updatedBrand : brand
        ),
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  deleteBrand: async (id) => {
    set({ loading: true, error: null });
    try {
      await clientAxios.delete(`/brands/delete/${id}`);
      set((state) => ({
        loading: false,
        brands: state.brands.filter((brand) => brand._id !== id),
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));

export default useBrandStore;
