import { TextField, Button } from "@mui/material";
import axios from "axios";
import IRestaurante from "interfaces/IRestaurante";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FormRestaurante() {
    const params = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    useEffect(() => {
        if (params.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
                .then(res => setNomeRestaurante(res.data.nome))
        }
    }, [params])

    const onSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (params.id && nomeRestaurante) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => alert(`Restaurante ${nomeRestaurante} atualizado com sucesso!`))
        }
        else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso!`))
        }
    }


    return (
        <form onSubmit={onSubmitForm}>
            <TextField
                id="nome"
                name="nome"
                variant="standard"
                value={nomeRestaurante}
                onChange={ev => setNomeRestaurante(ev.target.value)}
                placeholder="Nome do restaurante"
                required
            />
            <Button variant="outlined" type="submit">Salvar</Button>
        </form>
    )
}