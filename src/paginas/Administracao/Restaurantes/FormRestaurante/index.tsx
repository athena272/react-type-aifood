import { TextField, Button, Typography, Box } from "@mui/material";
import http from 'http/index'
import IRestaurante from "interfaces/IRestaurante";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function FormRestaurante() {
    const params = useParams()
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`v2/restaurantes/${params.id}/`)
                .then(res => setNomeRestaurante(res.data.nome))
        }
    }, [params])

    const onSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (params.id && nomeRestaurante) {
            http.put(`v2/restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => alert(`Restaurante ${nomeRestaurante} atualizado com sucesso!`))
        }
        else {
            http.post('v2/restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => alert(`Restaurante ${nomeRestaurante} cadastrado com sucesso!`))
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '35px' }}>
            <Typography component='h1' variant="h5">Formulário de Restaurantes</Typography>
            <Box component='form' onSubmit={onSubmitForm}>
                <TextField
                    id="nome"
                    name="nome"
                    variant="standard"
                    value={nomeRestaurante}
                    onChange={ev => setNomeRestaurante(ev.target.value)}
                    placeholder="Nome do restaurante"
                    required
                    fullWidth
                    sx={{ marginBottom: '15px', paddingY: '15px' }}
                />
                <Button
                    variant="outlined"
                    type="submit"
                    fullWidth
                >
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}