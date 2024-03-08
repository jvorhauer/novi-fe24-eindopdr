import './Gravatar.css';

export const Gravatar = ({hash, naam, handler}) => {
  const desc = `Aangemeld als ${naam}`;
  return (
    <div className="hover-text">
      <img className="gravatar"
           src={`https://gravatar.com/avatar/${hash}`}
           alt={desc}
           onClick={handler}></img>
      <span className="tooltip-text tooltip-right">{desc}</span>
    </div>
  );
}
