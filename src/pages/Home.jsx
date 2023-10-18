import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Home() {
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBookList(response.data.data);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="flex min-h-[100vh] flex-col items-center justify-center">
        {loading ? (
          // Render a loading state while fetching data
          <Spinner size="lg" />
        ) : (
          <>
            <button className="mb-3 ml-auto rounded bg-slate-300 px-4 py-3 hover:bg-slate-400">
              <Link to="/books/create">Add Book</Link>
            </button>
            <table className="w-full table-auto rounded">
              <thead>
                <tr className="border bg-slate-200 px-3 py-1">
                  <th className="border border-slate-300 px-3 py-1">No.</th>
                  <th className="border border-slate-300 px-3 py-1">Title</th>
                  <th className="border border-slate-300 px-3 py-1">Author</th>
                  <th className="border border-slate-300 px-3 py-1">
                    Publish Year
                  </th>
                  <th className="border border-slate-300 px-3 py-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((book, index) => (
                  <tr key={book._id} className="border border-slate-300">
                    <td className="border border-slate-300 px-3 py-1">
                      {index + 1}
                    </td>
                    <td className="border border-slate-300 px-3 py-1">
                      {book.title}
                    </td>
                    <td className="border border-slate-300 px-3 py-1 text-center">
                      {book.author}
                    </td>
                    <td className="border border-slate-300 px-3 py-1 text-center">
                      {book.publishYear}
                    </td>
                    <td className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>Show </Link>
                      <Link to={`/books/edit/${book._id}`}>Edit </Link>
                      <Link to={`/books/delete/${book._id}`}>Delete </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
