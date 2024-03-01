import "./Button.css";

const GenericButton = ({ className = 'default-button', type = 'submit', children, ...rest }) => {
  return (<button type={type} className={className} {...rest}>{children}</button>);
}

export const SaveButton = () => {
  return (<GenericButton>Bewaar</GenericButton>);
}

export const LoginButton = () => {
  return (<GenericButton>Login</GenericButton>);
}

export const RegistreerButton = () => {
  return (<GenericButton>Registreer</GenericButton>);
}

export const ResetButton = () => {
  return (<GenericButton className="reset-button" type="reset">Laat maar</GenericButton>);
}

export const EditButton = ({ handler, title, children }) => {
  return (<GenericButton className="edit-button" title={title} onClick={handler}><i className="fas fa-edit"></i> {children}</GenericButton>);
}

export const RemoveButton = ({ handler, title, children }) => {
  return (<GenericButton className="remove-button" title={title} onClick={handler}><i className="fas fa-trash-alt"></i>&nbsp;{children}</GenericButton>);
}

export const NewButton = ({ handler, title }) => {
  return (<GenericButton className="new-button" title={title} onClick={handler}><i className="fas fa-plus"></i>&nbsp;{title}</GenericButton>);
}

export const NavButton = ({ handler, klass, children}) => {
  return (<GenericButton className={klass} type="button" onClick={handler}>{children}</GenericButton>);
}
