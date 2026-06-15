import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/resume', label: 'Resume' },
  { to: '/about', label: 'About' },
];

const socialLinks = [
  { href: 'https://github.com/', label: 'GitHub' },
  { href: 'https://linkedin.com/', label: 'LinkedIn' },
  { href: 'mailto:hello@eddiejaques.me', label: 'Email' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `font-body font-medium text-sm transition-colors duration-200 hover:text-accent hover:underline ${
    isActive ? 'text-accent underline' : 'text-ink'
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-sticky h-[72px] bg-bg-primary border-b border-border">
      <div className="h-full flex items-center justify-between px-6">
        <NavLink to="/" className="font-display font-bold text-lg text-ink">
          eddiejaques
        </NavLink>

        <nav className="hidden min-[760px]:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-[760px]:flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-sm text-ink transition-colors duration-200 hover:text-accent hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="min-[760px]:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="block h-0.5 w-full bg-ink" />
          <span className="block h-0.5 w-full bg-ink" />
          <span className="block h-0.5 w-full bg-ink" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-modal min-[760px]:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-4/5 bg-bg-primary border-l-2 border-accent p-5 flex flex-col gap-6">
            <button
              className="self-end w-6 h-6 text-ink font-display font-bold text-xl"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={linkClass}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex flex-col gap-4 mt-auto">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-medium text-sm text-ink hover:text-accent hover:underline"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
