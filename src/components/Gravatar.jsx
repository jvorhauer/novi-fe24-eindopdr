import './Gravatar.css';

export const Gravatar = ({hash, naam, handler}) => {
  return (
    <img className="gravatar"
         src={`https://gravatar.com/avatar/${hash}`}
         title={`log ${naam} uit`}
         alt="Gravatar"
         onClick={handler}></img>
  );
}
