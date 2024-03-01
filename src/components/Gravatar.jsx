import './Gravatar.css';

export const Gravatar = ({hash, naam, handler}) => {
  const desc = `log ${naam} uit`;
  return (
    <img className="gravatar"
         src={`https://gravatar.com/avatar/${hash}`}
         title={desc}
         alt={desc}
         onClick={handler}></img>
  );
}
