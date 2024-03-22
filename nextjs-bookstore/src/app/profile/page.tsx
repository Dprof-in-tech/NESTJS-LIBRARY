'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: string;
  bookTitle: string;
  price: number;
  // Add other properties as needed
}

interface UserData {
    name: string;
    email: string;
    // Add other properties as needed
  }

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bookstore/profile');
        setUserData(response.data as UserData);
        setOrderHistory(response.data.orderHistory as Order[]);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const cancelOrder = async (orderId: string) => {
    try {
      await axios.post(`http://localhost:3001/bookstore/cancelOrder/${orderId}`);
      const response = await axios.get('http://localhost:3001/bookstore/profile');
      setOrderHistory(response.data.orderHistory as Order[]);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData.name}</h1>
      <p>Email: {userData.email}</p>

      <h2>Order History</h2>
      <ul>
        {orderHistory.map((order) => (
          <li key={order.id}>
            Book: {order.bookTitle}, Price: {order.price}
            <button onClick={() => cancelOrder(order.id)}>Cancel Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
