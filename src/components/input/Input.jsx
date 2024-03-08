import "./Input.css";

export const Input = ({label, type, name, handler, children}) => {
  const id = name + "-field";
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input type={type}
             id={id}
             name={name}
             value={children}
             required="required"
             onChange={handler} />
    </>
  );
}

export const InputArea = ({label, name, handler, rows, value}) => {
  const id = name + "-field";
  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <textarea id={id}
                name={name}
                rows={rows}
                onChange={handler}
                required="required"
                value={value}></textarea>
    </>
  )
}
