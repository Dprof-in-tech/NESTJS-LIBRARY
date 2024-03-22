import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

const PageHeader = () => {
  const { user } = useUserStore();
  console.log("user_res", user);

  //   useEffect(() => {
  //     if (!user) {
  //       window.location.href = "/login";
  //     }
  //   }, [user]);

  return user ? (
    <div className="p-4 flex items-center justify-between">
      <p>active user: {user?.email}</p>
      <p>{user?.points} points</p>
    </div>
  ) : (
    <a
      href="/login"
      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 "
    >
      login
    </a>
  );
};

export default PageHeader;
