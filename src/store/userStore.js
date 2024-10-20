import { create } from "zustand";
import clientAxios from "../utils/clientAxios";
import { devtools } from "zustand/middleware";

const useUserStore = create(
  devtools((set) => ({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,

    getUser: async () => {
      set({ loading: true, error: null });
      try {
        const { data } = await clientAxios.get("/users/get");
        set({ isAuthenticated: true, user: data.user, loading: false });
      } catch (error) {
        set({ isAuthenticated: false, user: null, loading: false});
      }
    },

    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        await clientAxios.post("/users/login", {
          email,
          password,
        });
        set({ isAuthenticated: true, loading: false });
      } catch (error) {
        set({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: error
        });
        throw error;
      }
    },

    logout: async () => {
      set({ loading: true, error: null });
      try {
        await clientAxios.get("/users/logout");
        set({ isAuthenticated: false, user: null, loading: false });
      } catch (error) {
        set({ loading: false});
        throw error;
      }
    },
  }))
);

export default useUserStore;
