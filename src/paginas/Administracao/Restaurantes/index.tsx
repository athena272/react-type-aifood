import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import IRestaurante from "interfaces/IRestaurante"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function AdministracaoRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(res => setRestaurantes(res.data))
    }, [])

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
                                    [ <Link to={`/admin/restaurantes/${restaurante.id}`}>EDITAR</Link>]
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}