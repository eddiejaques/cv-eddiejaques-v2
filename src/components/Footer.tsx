const socialLinks = [
  { href: 'https://github.com/', label: 'GitHub' },
  { href: 'https://linkedin.com/', label: 'LinkedIn' },
  { href: 'mailto:hello@eddiejaques.me', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="print:hidden bg-bg-primary border-t border-border">
      <div className="flex items-center justify-between px-6 h-16 flex-wrap gap-4">
        <p className="font-body text-sm text-muted">
          © {new Date().getFullYear()} Gaurav Kumar Dani
        </p>
        <div className="flex items-center gap-6">
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
      </div>
    </footer>
  );
}
