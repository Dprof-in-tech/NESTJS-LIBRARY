'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

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

const Library = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://localhost:3001/bookstore/library');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(`http://localhost:3001/bookstore/books/${books[0].id}`); // Access the id property of the first book in the array
      if (response.status === 200) {
        window.location.href = "/profile"; // Redirect to the profile page
      }
    } catch (error) {
      console.error('Error getting book:', error);
    }
  };
  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">library</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => (
            <div key={book.id} className="group relative">
              <button onClick={handleClick}>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={book.coverImage}
                      alt="book image"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-md font-bold text-gray-700">{book.title}</h3>
                      <h3 className="text-sm text-gray-700">{book.author}</h3>
                      <div className="flex flex-wrap gap-1">
                        {book.tags.map((tag, index) => (
                          <span key={index} className="px-4 py-1 bg-gray-200 rounded-md text-sm text-gray-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Points: {book.price}</p>
                  </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
