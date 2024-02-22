import "./Button.css";

const GenericButton = (text, clazz, type) => {
  const _clazz = !clazz ? "default-button" : clazz;
  const _type = !type ? "submit" : type;
  return (<button type={_type} className={_clazz}>{text}</button>);
}

export const SaveButton = () => GenericButton("Bewaar");

export const LoginButton = () => GenericButton("Login");

export const RegistreerButton = () => GenericButton("Registreer");

export const ResetButton = () => GenericButton("Laat maar", "reset-button", "reset");

export const EditButton = ({ handler, title }) => {
  return (<button onClick={handler} className="edit-button" title={title}><i className="fas fa-edit"></i></button>);
}

export const RemoveButton = ({ handler, title }) => {
  return (<button onClick={handler} className="remove-button" title={title}><i className="fas fa-trash-alt"></i></button>);
}

export const NewButton = ({ handler, title }) => {
  return (<button onClick={handler} className="new-button" title={title}><i className="fas fa-plus"></i> {title}</button>);
}

export const NavButton = ({ handler, klass, children}) => {
  return (<button onClick={handler} className={klass}>{children}</button>)
}
