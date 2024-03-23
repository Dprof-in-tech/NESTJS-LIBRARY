import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { useEffect } from "react";

const PageHeader = () => {
  const { user } = useUserStore();

  return user ? (
    <div className="p-4 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-4">
        <Link href={"/"}>
          {" "}
          <h1 className="mr-2 text-xl font-bold">Home</h1>
        </Link>{" "}
        <p>{user?.email}</p>
        {/* <p>{user?.id}</p> */}
      </div>
      <div className="flex flex-row items-center gap-4">
        <p>{user?.points} points</p>
        <Link href={"/profile"}>
          {" "}
          <h1 className="ml-2 text-base font-semibold">view orders</h1>
        </Link>{" "}
      </div>
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
