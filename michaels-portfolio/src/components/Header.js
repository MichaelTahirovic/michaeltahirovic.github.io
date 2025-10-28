import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  return (
    <header className="w-full h-16 bg-headerColor text-headerFont flex justify-between items-center py-2 sticky top-0 z-50">
      <div>
        <h1 className="font-roboto text-3xl pl-4 font-bold">
          <Link onClick={() => { setMenuOpen((s) => false); window.scrollTo(0, 0); }} to="/">Michael Tahirovic</Link>
        </h1>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex justify-space-between items-center p-1 pr-5 px-1 gap-6">
        <Link className="text-headerFont hover:text-white" onClick={() => window.scrollTo(0, 0)} to="/about">About Me</Link>
        <Link className="text-headerFont hover:text-white" onClick={() => window.scrollTo(0, 0)} to="/jobs">Employment</Link>
        <Link className="text-headerFont hover:text-white" onClick={() => window.scrollTo(0, 0)} to="/projects">Projects</Link>
      </nav>

      {/* Mobile menu button + dropdown */}
      <div className="md:hidden relative">
        <button
          ref={buttonRef}
          onClick={() => { setMenuOpen((s) => !s) }}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          className="p-2 rounded-md text-headerFont hover:text-white focus:outline-none"
        >
          {/* simple hamburger icon */}
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-40 bg-headerColor text-headerFont rounded-md shadow-lg z-50 overflow-hidden"
            role="menu"
            aria-label="Mobile navigation"
          >
            <Link
              to="/about"
              onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}
              className="block px-4 py-2 hover:text-white hover:bg-gray-500"
              role="menuitem"
            >
              About Me
            </Link>
            <Link
              to="/jobs"
              onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}
              className="block px-4 py-2 hover:text-white hover:bg-gray-500"
              role="menuitem"
            >
              Employment
            </Link>
            <Link
              to="/projects"
              onClick={() => { setMenuOpen(false); window.scrollTo(0, 0); }}
              className="block px-4 py-2 hover:text-white hover:bg-gray-500"
              role="menuitem"
            >
              Projects
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}