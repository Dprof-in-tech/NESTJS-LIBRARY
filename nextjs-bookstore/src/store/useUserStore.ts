import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Iuser {
  email: string;
  points: number;
  id: number;
}

interface userState {
  user?: Iuser;
}

interface userActions {
  setUser: (User: Iuser) => void;
  removeUser: () => void;
}

export const useUserStore = create(
  persist<userState & userActions>(
    (set) => ({
      user: undefined,
      setUser: (userD: Iuser) => {
        set(() => ({ user: userD }));
      },
      removeUser: () => {
        set({ user: undefined }); // removing the user by setting it to undefined
      },
    }),
    {
      name: "user-storage", // unic name
      // getStorage: () => sessionStorage, (optional) by default the 'localStorage' is used
    }
  )
);
