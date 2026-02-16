import { useParams, Link } from "react-router-dom";

export default function Skillsquiz() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 mt-6">
          Quiz Page
        </h1>

        <p className="text-slate-600 mt-3">
          You opened: <span className="font-semibold">{slug}</span>
        </p>

        <div className="mt-10 p-6 border rounded-xl">
          <p className="text-slate-700">
            Here you can add quiz questions, options, score system, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
