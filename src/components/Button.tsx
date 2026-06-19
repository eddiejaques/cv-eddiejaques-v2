import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'text';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-[#100F0D] font-body font-semibold text-sm px-6 py-3.5 min-h-12 rounded transition-all duration-200 hover:bg-accent-deep hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-transparent text-ink border border-border font-body font-semibold text-sm px-6 py-3.5 min-h-12 rounded transition-colors duration-200 hover:border-accent hover:text-accent whitespace-nowrap',
  text:
    'bg-transparent text-accent font-body font-semibold text-sm p-0 no-underline hover:underline [text-decoration-thickness:2px] transition-all duration-200',
};

type ButtonAsButton = {
  as?: 'button';
  variant?: Variant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  as: 'link';
  variant?: Variant;
} & LinkProps;

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { as, variant = 'primary', className = '', ...rest } = props;
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (as === 'link') {
    return <Link className={classes} {...(rest as Omit<ButtonAsLink, 'as' | 'variant'>)} />;
  }

  return <button className={classes} {...(rest as Omit<ButtonAsButton, 'as' | 'variant'>)} />;
}
