"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

interface Order {
  id: number;
  title: string;
  description: string;
  author: string;
  price: string;
  coverImage: string;
  tags: [string];
  available: boolean;
}

interface UserData {
  name: string;
  email: string;
  id: number;
  // Add other properties as needed
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `https://nest-hypehire-server.onrender.com/bookstore/purchases/${
            user?.id ?? ""
          }`
        );
        setOrderHistory(res.data);
        console.log("res_d", res);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const cancelOrder = async (orderId: number) => {
    try {
      const cRes = await axios.delete(
        `https://nest-hypehire-server.onrender.com/bookstore/orders/${orderId}`
      );
      console.log("res_d", cRes);
      if (cRes.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg">Order History</h2>
      {orderHistory.length === 0 ? (
        <div>No orders yet</div>
      ) : (
        <div className="gap-2">
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-xl w-[95%] h-[fit-content] flex flex-col md:flex-row text-md font-bold text-gray-700 md:gap-4 lg:gap-32 px-8 py-4"
            >
              <div className="w-full md:w-[40%] lg:w-[25%] h-[30vh] p-2 rounded-md bg-gray-200">
                <Image
                  width={500}
                  height={500}
                  src={order.coverImage}
                  alt="book image"
                  className="h-full w-full object-fit object-center"
                />
              </div>
              <div className="mt-4 p-4 flex flex-col gap-3 justify-evenly h-[fit-content]">
                <h3 className="text-md font-bold text-gray-700">
                  {order.author}
                </h3>
                <p className="text-md  text-gray-700">{order.description}</p>

                <p className="text-sm font-medium text-gray-900">
                  Points: {order.price}
                </p>
                <button
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelOrder(order.id);
                    console.log("Order button clicked");
                  }}
                >
                  cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
