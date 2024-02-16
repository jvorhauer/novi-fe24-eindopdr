export const Input = ({label, type, name, handler, children}) => {
  const id = {name} + "-field";
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input type={type}
             id={id}
             name={name}
             value={children}
             onChange={handler}/>
    </>
  );
}
