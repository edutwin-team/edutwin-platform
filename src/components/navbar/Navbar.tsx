import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 px-6 shadow">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          🎓 Digital Twin Edu
        </Link>
      </div>

      <div className="flex gap-2">
        <Link to="/dashboard" className="btn btn-ghost btn-sm">Dashboard</Link>
        <Link to="/quiz" className="btn btn-ghost btn-sm">Quiz</Link>
        <Link to="/profile" className="btn btn-ghost btn-sm">Profil</Link>
        <Link to="/teacher" className="btn btn-ghost btn-sm">Enseignant</Link>
        <Link to="/about" className="btn btn-outline btn-sm">Projet</Link>
      </div>
    </div>
  )
}
