import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

export default function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
        enqueueSnackbar("Book Edited Successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error in Editing Book", { variant: "error" });
        console.log(error);
      });
  }, []);

  const handleEditBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.error(error);
      });
  };

  return (
    <div className="wrapper">
      <BackButton />
      <div className="flex items-center justify-center">
        {loading ? (
          <Spinner />
        ) : (
          <form
            action=""
            className="w-full max-w-2xl rounded bg-red-200 p-5 px-8"
          >
            <h1 className="my-6 text-center text-lg font-bold">Edit Book</h1>
            <div className="flex flex-col space-y-6">
              <div className="">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  className="w-full rounded px-3 py-2 outline-blue-200"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  className="w-full rounded px-3 py-2 outline-blue-200"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="">
                <label htmlFor="publishYear">Publish Year</label>
                <input
                  type="text"
                  id="publishYear"
                  value={publishYear}
                  className="w-full rounded px-3 py-2 outline-blue-200"
                  onChange={(e) => setPublishYear(e.target.value)}
                />
              </div>
              <button
                type="submit"
                onClick={handleEditBook}
                className="mx-auto w-full rounded bg-gray-700 p-2 px-4 uppercase text-white md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
