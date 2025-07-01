import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full h-20 bg-headerColor text-headerFont flex justify-between items-center px-4 py-2 sticky top-0 z-50">
      <div>
        <h1 className="font-roboto text-3xl px-1 font-bold"><Link to="/">Michael Tahirovic</Link></h1>
      </div>
      <nav className="hidden md:flex justify-space-between items-center p-1 pr-px-1 gap-6">
        <Link className="text-headerFont hover:text-white" to="/about">About Me</Link>
        <Link className="text-headerFont hover:text-white" to="/jobs">Employment</Link>
        <Link className="text-headerFont hover:text-white" to="/projects">Projects</Link>
      </nav>
    </header>
  );
}