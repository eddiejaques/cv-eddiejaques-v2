import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'text';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white font-body font-semibold text-sm px-6 py-3.5 min-h-12 rounded transition-colors duration-200 hover:brightness-90 active:brightness-75',
  secondary:
    'bg-transparent text-accent border-2 border-accent font-body font-semibold text-sm px-6 py-3.5 min-h-12 rounded transition-colors duration-200 hover:bg-accent hover:text-white whitespace-nowrap',
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
  const { variant = 'primary', className = '', ...rest } = props;
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (props.as === 'link') {
    const { as: _as, variant: _v, ...linkProps } = rest as ButtonAsLink;
    return <Link className={classes} {...linkProps} />;
  }

  const { as: _as, variant: _v, ...buttonProps } = rest as ButtonAsButton;
  return <button className={classes} {...buttonProps} />;
}
