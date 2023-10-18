import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="wrapper">
      <BackButton />
      {loading ? (
        <Spinner size="s" />
      ) : (
        <div className="w-full">
          <div className="my-4 md:flex">
            <div className="w-full  border border-slate-300 bg-slate-300 p-3  font-semibold md:w-[250px] ">
              Title
            </div>
            <div className="w-full border border-slate-300 p-3">
              {book.title}
            </div>
          </div>
          <div className="my-4 md:flex">
            <div className="w-full border  border-slate-300 bg-slate-300 p-3 font-semibold md:w-[250px] ">
              Author
            </div>
            <div className="w-full border border-slate-300 p-3">
              {book.author}
            </div>
          </div>
          <div className="my-4  md:flex">
            <div className="w-full   border border-slate-300 bg-slate-300 p-3 font-semibold md:w-[250px] ">
              Publish Year
            </div>
            <div className="w-full border border-slate-300 p-3">
              {book.publishYear}
            </div>
          </div>
          <div className="my-4  md:flex">
            <div className="bo rder w-full  border-slate-300 bg-slate-300 p-3 font-semibold md:w-[250px] ">
              Time Created
            </div>
            <div className="w-full border border-slate-300 p-3">
              {new Date(book.createdAt).toString()}
            </div>
          </div>
          <div className="my-4  md:flex">
            <div className="bo rder w-full border-slate-300 bg-slate-300 p-3 font-semibold md:w-[250px] ">
              Last Update Time
            </div>
            <div className="w-full border border-slate-300 p-3">
              {new Date(book.updatedAt).toString()}
            </div>
          </div>
          <div className="my-4  md:flex">
            <div className="bo rder w-full border-slate-300 bg-slate-300 p-3 font-semibold md:w-[250px] ">
              Book ID
            </div>
            <div className="w-full border border-slate-300 p-3">{book._id}</div>
          </div>
          {console.log(book)}
        </div>
      )}
    </div>
  );
}
