import { useParams, Link } from "react-router-dom";

export default function Quizcyber() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-blue-600 font-semibold hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-black text-slate-900 mt-6">
          Quiz Page
        </h1>

        <p className="text-slate-600 mt-3">
          You opened: <span className="font-semibold">{slug}</span>
        </p>

        <div className="mt-10 p-8 border rounded-2xl">
          <p className="text-slate-700">
            Add quiz questions here + score system.
          </p>
        </div>
      </div>
    </div>
  );
}
