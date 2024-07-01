import { useState, useEffect } from 'react';
import IRestaurante from 'interfaces/IRestaurante';
import IPaginacao from 'interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import http from 'http/index'

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextLinkPage, setNextLinkPage] = useState('')

  useEffect(() => {
    //obter restaurantes
    http.get<IPaginacao<IRestaurante>>('v1/restaurantes/')
      .then(res => {
        setRestaurantes(res.data.results)
        setNextLinkPage(res.data.next)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const seeMorePages = () => {
    http.get<IPaginacao<IRestaurante>>(nextLinkPage)
      .then(res => {
        setRestaurantes(prevState => [...prevState, ...res.data.results])
        setNextLinkPage(res.data.next)
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {
      restaurantes?.map(item =>
        <Restaurante restaurante={item} key={item.id} />
      )
    }
    {
      nextLinkPage &&
      <button
        onClick={seeMorePages}
      >
        Ver mais
      </button>
    }
  </section>)
}

export default ListaRestaurantes