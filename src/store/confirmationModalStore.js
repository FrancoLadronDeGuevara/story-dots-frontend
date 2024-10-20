import { create } from "zustand";

const useConfirmationModalStore = create((set) => ({
  isModalOpen: false,
  title: "",
  onConfirm: null,
  showModal: (title, onConfirm) => set({ isModalOpen: true, title, onConfirm }),
  closeModal: () => set({ isModalOpen: false, title: "", onConfirm: null }),
  confirm: () =>
    set((state) => {
      if (state.onConfirm) state.onConfirm();
      return { isModalOpen: false, title: "", onConfirm: null };
    }),
}));

export default useConfirmationModalStore;
