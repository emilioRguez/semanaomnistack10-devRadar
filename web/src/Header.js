import React from 'react'

function Header(props) { // props - parametro q carga todas las propiedades definidas
  return (
    <h1>{ props.title }</h1>
  );
}

export default Header;
