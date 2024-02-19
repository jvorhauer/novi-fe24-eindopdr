export const Submit = ({ children }) => {
  return (
    <button type="submit" className="default-button">
      {children}
    </button>
  );
}

export const Clicker = ({ handler, children }) => {
  return (
    <button type="button" className="default-button" onClick={handler}>
      {children}
    </button>
  );
}
