import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 px-6 shadow ">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          🎓 EduTwin
        </Link>
      </div>

      <div className="flex gap-2">

        <Link to="/profile" className="btn btn-outline btn-sm">Profil</Link>

        <Link to="/dashboard" className="btn btn-primary btn-sm border-rad ">Get Started</Link>
      </div>
    </div>
  )
}
