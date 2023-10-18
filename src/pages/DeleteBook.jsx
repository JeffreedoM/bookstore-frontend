import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error in Deleting Book", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      <BackButton />

      <div className="flex items-center justify-center text-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full max-w-lg rounded-lg bg-red-200 px-4 py-8">
            <h1 className="text-lg font-semibold">
              Are you sure you want to delete this book?
            </h1>
            <div className="mt-6 flex justify-around gap-3">
              <button
                onClick={handleDeleteBook}
                className="w-full rounded-lg bg-red-500 p-3 px-4 text-white md:w-auto"
              >
                Yes, Delete this book
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-lg bg-gray-700 p-3 px-4 text-white md:w-auto"
              >
                No, Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
