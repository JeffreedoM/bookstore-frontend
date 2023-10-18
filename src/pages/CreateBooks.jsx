import { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
export default function CreateBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created Successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error in Creating Book", { variant: "error" });
        console.log(error);
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
            <h1 className="my-6 text-center text-lg font-bold">Add Book</h1>
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
                onClick={handleSaveBook}
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
