import { create } from "zustand";

const useSnackbarStore = create((set) => ({
  isOpen: false,
  message: "",
  severity: "success",
  showSnackbar: (message, severity) => set({ isOpen: true, message, severity }),
  closeSnackbar: () => set({ isOpen: false, message: "", severity: "success" }),
}));

export default useSnackbarStore;
