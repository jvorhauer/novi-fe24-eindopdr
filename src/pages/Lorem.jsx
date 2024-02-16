import {Link} from 'react-router-dom';

const Lorem = () => {
  return (
    <>
      <h1>Lorem</h1>
      <section>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem id libero provident! Accusantium at autem
          cumque, esse eum, fugiat ipsa ipsam quia quis ratione repudiandae sapiente sequi sit tempora voluptates.
          Accusantium aperiam asperiores, beatae dolor eius error expedita laboriosam maiores minima mollitia nisi
          pariatur quaerat quam ratione reiciendis rem similique unde veritatis vitae voluptatum. At atque beatae dolor
          fuga hic laudantium maxime praesentium quae quia repudiandae sapiente, sed sint, voluptas. Aliquid asperiores
          assumenda commodi consectetur cumque delectus, distinctio dolore ex facilis fugiat maiores officiis quo,
          saepe, sequi sunt tempora vero.</p>
      </section>
      <section>
        <p>Als je ingelogd bent, bekijk dan de <Link to="/taken">Taken lijst</Link></p>
        <p>Je kunt ook <Link to="/login">inloggen</Link> of jezelf <Link to="/registreer">registeren</Link> als je nog geen
          account hebt.</p>
      </section>
    </>
  );
}

export default Lorem;
