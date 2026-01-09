import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 p-4">
      <Link to="/" className="btn btn-ghost normal-case text-xl">Home</Link>
      <Link to="/quiz" className="btn btn-ghost normal-case text-xl">Quiz</Link>
    </div>
  );
}
