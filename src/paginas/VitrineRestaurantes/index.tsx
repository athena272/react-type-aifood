import React from 'react';
import Banner from 'componentes/Banner';
import ListaRestaurantes from 'componentes/ListaRestaurantes';
// import PaginationRestaurantes from 'componentes/PaginationRestaurantes';
import NavBar from 'componentes/NavBar';
import Rodape from 'componentes/Rodape';

function App() {
  return (
    <>
      <NavBar />
      <Banner />
      <ListaRestaurantes />
      {/* <PaginationRestaurantes /> */}
      <Rodape />
    </>
  );
}

export default App;
