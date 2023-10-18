import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
export default function BackButton({ destination = "/" }) {
  return (
    <div>
      <button className="mt-3 rounded bg-slate-600 px-4 py-2 text-2xl font-bold text-white hover:bg-slate-700">
        <Link to={destination}>
          <BiArrowBack className="" />
        </Link>
      </button>
    </div>
  );
}
