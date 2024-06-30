import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function FormRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const onSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
            .then(() => alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso!`))
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