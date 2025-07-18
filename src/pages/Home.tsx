import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  author: string;
};

function Home() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Better Read</h1>
      <ul className="grid gap-4">
        {books.map((book) => (
          <li key={book.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-600">by {book.author}</p>
            <Link to={`/reader/${book.id}`} className="text-blue-600 underline">
              Read Now
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
