export const Submit = ({ children }) => {
  return (
    <button type="submit" className="default-button">
      {children}
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
