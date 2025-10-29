import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

  // Transition state for the full-screen black swipe
  const [overlayState, setOverlayState] = React.useState('idle'); // 'idle' | 'in' | 'out'
  const timeoutsRef = React.useRef([]);

  const IN_MS = 400;
  const OUT_MS = 400;

  const navigate = useNavigate();
  const navigateRef = React.useRef(navigate);

  function navigateWithTransition(e, to) {
    if (e && e.preventDefault) e.preventDefault();
    setMenuOpen(false);

    // don't double-trigger
    if (overlayState !== 'idle') return;

    setOverlayState('in');

    const t1 = setTimeout(() => {
      if (navigateRef.current) {
        navigateRef.current(to);
      } else {
        // fallback - full reload (less ideal)
        window.location.href = to;
      }

      // start swipe-out after navigation
      setOverlayState('out');

      const t2 = setTimeout(() => {
        setOverlayState('idle');
      }, OUT_MS);
      timeoutsRef.current.push(t2);
    }, IN_MS);

    timeoutsRef.current.push(t1);
  }

  React.useEffect(() => {
    return () => {
      // cleanup timers
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  // Compute overlay classes for sliding/fading
  const baseOverlay =
    'fixed top-0 left-0 w-[150vw] h-screen bg-gradient-to-r from-blue-600 to-purple-900 z-40 transition-transform ease-in-out';
  const overlayClass =
    overlayState === 'idle'
      ? `${baseOverlay} -translate-x-[150vw] opacity-0 pointer-events-none`
      : overlayState === 'in'
      ? `${baseOverlay} translate-x-0 opacity-100 pointer-events-auto`
      : `${baseOverlay} translate-x-[100vw] opacity-100 pointer-events-auto`;

  // When overlay has fully slid in, scroll to top.
  React.useEffect(() => {
    if (overlayState !== 'in') return;
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
    }, IN_MS);
    timeoutsRef.current.push(t);
    return () => clearTimeout(t);
  }, [overlayState, IN_MS]);

  return (
    <>
    <header className="w-full h-16 bg-headerColor text-headerFont flex justify-between items-center py-2 sticky top-0 z-50">
      <div>
        <h1 className="font-roboto text-3xl pl-4 font-bold">
          <Link
            onClick={(e) => {
              navigateWithTransition(e, '/');
            }}
            to="/"
          >
            Michael Tahirovic
          </Link>
        </h1>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex justify-space-between items-center p-1 pr-5 px-1 gap-6">
        <Link className="text-headerFont hover:text-white" onClick={(e) => navigateWithTransition(e, '/about')} to="/about">About Me</Link>
        <Link className="text-headerFont hover:text-white" onClick={(e) => navigateWithTransition(e, '/jobs')} to="/jobs">Employment</Link>
        <Link className="text-headerFont hover:text-white" onClick={(e) => navigateWithTransition(e, '/projects')} to="/projects">Projects</Link>
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
              onClick={(e) => { navigateWithTransition(e, '/about'); }}
              className="block px-4 py-2 hover:text-white hover:bg-gray-500"
              role="menuitem"
            >
              About Me
            </Link>
            <Link
              to="/jobs"
              onClick={(e) => { navigateWithTransition(e, '/jobs'); }}
              className="block px-4 py-2 hover:text-white hover:bg-gray-500"
              role="menuitem"
            >
              Employment
            </Link>
            <Link
              to="/projects"
              onClick={(e) => { navigateWithTransition(e, '/projects'); }}
              className="block px-4 py-2 hover:text-white hover:bg-gray-500"
              role="menuitem"
            >
              Projects
            </Link>
          </div>
        )}
      </div>
    </header>
    {/* Swipe overlay */}
      <div
        className={overlayClass}
        style={{ transitionDuration: `${overlayState === 'idle' ? 0 : overlayState === 'in' ? IN_MS : OUT_MS}ms` }}
        aria-hidden={overlayState === 'idle'}
      />
    </>
  );
}