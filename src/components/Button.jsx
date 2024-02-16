export const Button = ({ type, children }) => {
  return (
    <button type={type} className="default-button">
      {children}
    </button>
  );
};

export const Submit = ({ children }) => Button("submit", children);

export const Clicker = ({ handler, children }) => {
  return (
    <button type="button" className="default-button" onClick={handler}>
      {children}
    </button>
  );
}
