import "./Button.css";

export const Submit = () => {
  return (
    <button type="submit" className="default-button">
      Bewaar
    </button>
  );
}

export const Reset = () => {
  return (
    <button type="reset" className="reset-button">
      Laat maar
    </button>
  );
}

export const Clicker = ({ handler, children, className }) => {
  return (
    <button type="button" className={className} onClick={handler}>
      {children}
    </button>
  );
}
