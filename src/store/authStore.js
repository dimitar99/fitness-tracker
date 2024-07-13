import { create } from "zustand";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {};
};

export const userStore = create((set) => ({
  user: getUserFromLocalStorage(),
  saveUser: (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ user: newUser });
  },
  deleteUser: () => {
    localStorage.removeItem("user");
    set({ user: {} });
  },
  isUserLogged: () => JSON.stringify(getUserFromLocalStorage()) !== "{}",
}));
