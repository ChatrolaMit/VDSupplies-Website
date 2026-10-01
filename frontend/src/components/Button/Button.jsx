import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  fullWidth = false,
  as: Tag = 'button',
  className = '',
  ...props
}) {
  return (
    <Tag
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 18} className="btn__icon" />}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 16 : 18} className="btn__icon-right" />}
    </Tag>
  );
}
