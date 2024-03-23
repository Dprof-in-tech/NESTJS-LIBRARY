"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { useUserStore } from "@/store/useUserStore";

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

const Home = () => {
  const { user, setUser } = useUserStore();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>(
          "https://nest-hypehire-server.onrender.com/bookstore/library"
        );
        setBooks(response.data);

        // Generate unique list of tags
        const tags = new Set<string>();
        response.data.forEach((book) => {
          book.tags.forEach((tag) => {
            tags.add(tag);
          });
        });
        setAllTags(Array.from(tags));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setOrderStatus(null);
    setShowAlert(false);
  };

  const handleOrderClick = async (bookId: number) => {
    if (user) {
      try {
        const response = await axios.post(
          `https://nest-hypehire-server.onrender.com/bookstore/books/${bookId}/order`,
          {
            userId: user.id,
            pointsUsed: selectedBook?.price,
          }
        );
        if (response.status === 201) {
          console.log("Order placed successfully");
          const bookPoint = selectedBook?.price || 0;
          const userPoint = user?.points;

          const updatePoint = userPoint - bookPoint;
          const updateUserD = { ...user, points: updatePoint };
          setUser(updateUserD);

          setOrderStatus("success");
          setShowAlert(true);
          closeModal();
          setTimeout(() => {
            setShowAlert(false);
          }, 5000); // Close alert after 5 seconds
        } else {
          console.error("Failed to place order", response.status);
          setOrderStatus("failure");
          closeModal();
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 5000); // Close alert after 5 seconds
        }
      } catch (error) {
        console.error("Error placing order:", error);
        closeModal();
        setOrderStatus("failure");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000); // Close alert after 5 seconds
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Our Library
        </h2>

        {/* Filter UI */}
        <div className="filter-ui mb-4 flex flex-row mt-4 gap-4">
          <select
            value={selectedTag || ""}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">Select a filter</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <button onClick={() => setSelectedTag(null)}>Clear Filter</button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {/* Apply filter to the books list */}
          {books
            .filter((book) => !selectedTag || book.tags.includes(selectedTag))
            .map((book) => (
              <div key={book.id} className="group relative">
                <div onClick={() => handleBookClick(book)}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      width={500}
                      height={500}
                      src={book.coverImage}
                      alt="book image"
                      className="h-full w-full object-fit object-center"
                    />
                  </div>
                  <div className="mt-4 flex justify-around">
                    <div className="px-1">
                      <h3 className="text-md font-bold text-gray-700">
                        {book.title}
                      </h3>
                      <h3 className="text-sm text-gray-700">{book.author}</h3>
                      <div className="flex flex-wrap gap-2">
                        {book.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-2 bg-gray-200 font-semibold rounded-md text-sm text-gray-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      Points: {book.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {selectedBook && (
        <div
          className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-xl w-[95%] h-[fit-content] flex flex-col md:flex-row text-md font-bold text-gray-700 md:gap-4 lg:gap-32 px-8 py-4">
            <div className="w-full md:w-[40%] lg:w-[25%] h-[30vh] p-2 rounded-md bg-gray-200">
              <Image
                width={500}
                height={500}
                src={selectedBook.coverImage}
                alt="book image"
                className="h-full w-full object-fit object-center"
              />
            </div>
            <div className="mt-4 p-4 flex flex-col gap-3 justify-evenly h-[fit-content]">
              <h3 className="text-md font-bold text-gray-700">
                {selectedBook.author}
              </h3>
              <p className="text-md  text-gray-700">
                {selectedBook.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedBook.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 bg-gray-200 rounded-md text-sm text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-900">
                Points: {selectedBook.price}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrderClick(selectedBook.id);
                  console.log("Order button clicked");
                }}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="fixed top-0 right-0 m-4 bg-white border border-gray-300 rounded-lg shadow-md p-4 z-50">
          <p
            className={`text-lg font-bold ${
              orderStatus === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {orderStatus === "success"
              ? "Order placed successfully!"
              : "Failed to place order"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
