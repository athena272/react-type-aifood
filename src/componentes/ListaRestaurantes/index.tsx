import http from 'http/index';
import { useState, useEffect } from 'react';
import IRestaurante from 'interfaces/IRestaurante';
import IPaginacao from 'interfaces/IPaginacao';
import styles from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { AxiosRequestConfig } from 'axios';

// esses são os posséveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextLinkPage, setNextLinkPage] = useState('')

  const [busca, setBusca] = useState('')

  // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
  const loadData = (url: string, options: AxiosRequestConfig = {}) => {
    http.get<IPaginacao<IRestaurante>>(url, options)
      .then(res => {
        setRestaurantes(res.data.results)
        setNextLinkPage(res.data.next)
      })
  }

  // a cada busca, montamos um objeto de opções
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const options = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      options.params.search = busca
    }
    loadData('v1/restaurantes/', options)
  }

  useEffect(() => {
    //obter restaurantes
    //obter restaurantes
    loadData('v1/restaurantes/')
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

  return (<section className={styles.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={search} className={styles.search__form}>
      <label htmlFor="buscar">Nome do restaurante</label>
      <input
        id='buscar'
        type="text"
        placeholder='Insira o nome do restaurante'
        value={busca}
        onChange={(ev) => setBusca(ev.target.value)}
      />
      <button type='submit'>buscar</button>
    </form>
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