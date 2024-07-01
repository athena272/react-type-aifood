import { useState, useEffect } from 'react';
import IRestaurante from 'interfaces/IRestaurante';
import IPaginacao from 'interfaces/IPaginacao';
import style from './PaginationRestaurantes.module.scss';
import Restaurante from './Restaurante';
import http from 'http/index'


const PaginationRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextLinkPage, setNextLinkPage] = useState('')
  const [previousLinkPage, setPreviousLinkPage] = useState('')

  const loadData = (url: string) => {
    http.get<IPaginacao<IRestaurante>>(url)
      .then(res => {
        setRestaurantes(res.data.results)
        setNextLinkPage(res.data.next)
        setPreviousLinkPage(res.data.previous)
      })
  }

  useEffect(() => {
    //obter restaurantes
    loadData('v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {
      restaurantes?.map(item =>
        <Restaurante restaurante={item} key={item.id} />
      )
    }
    <button
      onClick={() => loadData(previousLinkPage)}
      disabled={previousLinkPage ? false : true}
    >
      Página anterior
    </button>
    <button
      onClick={() => loadData(nextLinkPage)}
      disabled={nextLinkPage ? false : true}
    >
      Próxima página
    </button>
  </section>)
}

export default PaginationRestaurantes