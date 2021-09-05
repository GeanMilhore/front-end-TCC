import React from "react";
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='container-middle'>
      <div className="m-auto">
        <h1>HOME</h1>
        <p>Página inicial do site</p>
        <Link to="/cadastrarItem">CadastrarItem</Link>
      </div>
    </div>
  );
};

export default Home;
