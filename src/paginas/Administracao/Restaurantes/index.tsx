import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import http from 'http/index'
import IRestaurante from "interfaces/IRestaurante"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('v2/restaurantes/')
            .then(res => setRestaurantes(res.data))
    }, [])

    const deleteRestaurante = (idToBeDeleted: number) => {
        http.delete(`v2/restaurantes/${idToBeDeleted}/`)
            .then(() => {
                const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== idToBeDeleted);
                setRestaurantes(listaRestaurantes)
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        restaurantes.map(restaurante => (
                            <TableRow key={restaurante.id}>
                                <TableCell>
                                    {restaurante.nome}
                                </TableCell>
                                <TableCell>
                                    [ <Link to={`/admin/restaurantes/${restaurante.id}`}>EDITAR</Link> ]
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant='outlined'
                                        color='error'
                                        onClick={() => deleteRestaurante(restaurante.id)}
                                    >
                                        EXCLUIR
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}