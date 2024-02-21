import "./Button.css";

const GenericButton = (text, clazz, type) => {
  const _clazz = !clazz ? "default-button" : clazz;
  const _type = !type ? "submit" : type;
  return (<button type={_type} className={_clazz}>{text}</button>);
}

export const SaveButton = () => GenericButton("Bewaar");

export const LoginButton = () => GenericButton("Login");

export const RegistreerButton = () => GenericButton("Registreer");

export const ResetButton = () => GenericButton("Laat maar", "reset-button");

export const Clicker = ({ handler, children, className }) => {
  return (<button type="button" className={className} onClick={handler}>{children}</button>);
}
