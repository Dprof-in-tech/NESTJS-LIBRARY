import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  price: number;
  tags: string[];
  available: boolean;
}

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get<Book>(
          `http://localhost:3001/bookstore/book/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleOrderBook = async () => {
    try {
      // Make a POST request to order the book
      const response = await axios.post(
        "http://localhost:3001/bookstore/order",
        { bookId: id }
      );
      console.log("Order placed successfully:", response.data);
      // Handle success response
    } catch (error) {
      console.error("Error ordering book:", error);
      // Handle error response
    }
  };

  return (
    <div>
      {book ? (
        <>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <div className="mt-4">
            <img
              src={book.coverImage}
              alt="Book Cover"
              className="w-48 h-auto"
            />
          </div>
          <p className="mt-4">{book.description}</p>
          <p className="mt-2">Author: {book.author}</p>
          <p>Price: ${book.price}</p>
          <button
            onClick={handleOrderBook}
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Order Book
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetail;
