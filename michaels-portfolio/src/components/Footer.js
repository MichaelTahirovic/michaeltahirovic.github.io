import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="Header">
      <div className="Header_Title">
        <h1 className="bold"><Link to="/">Michael Tahirovic</Link></h1>
      </div>
      <nav className="Directory">
        <Link to="/about">About Me</Link>
        <Link to="/jobs">Employment</Link>
        <Link to="/projects">Projects</Link>
      </nav>
    </header>
  );
}