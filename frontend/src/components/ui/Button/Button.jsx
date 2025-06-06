import "./Button.scss";

export default function Button({
  children,
  icon,
  iconPosition = "right",
  variant = "primary",
  onClick,
  disabled = false,
  type = false
}) {
  return (
    <button className={`btn ${variant}`} onClick={onClick} type={type ? "button" : ""} disabled={disabled}>
      {icon && iconPosition === "left" && (
        <img src={icon} alt="Иконка" className="btn__icon-left" />
      )}

      {children}

      {icon && iconPosition === "right" && (
        <img src={icon} alt="Иконка" className="btn__icon-right" />
      )}
    </button>
  );
}
