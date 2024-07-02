import { TextField, Button, Typography, Box, AppBar, Container, Toolbar, Link, Paper } from "@mui/material";
import http from 'http/index'
import IRestaurante from "interfaces/IRestaurante";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

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
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to='/admin/restaurantes'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/restaurantes/novo'>
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth='lg' sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/* Conteúdo da página */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '35px', flexGrow: 1 }}>
                            <Typography component='h1' variant="h5">Formulário de Restaurantes</Typography>
                            <Box component='form' onSubmit={onSubmitForm} sx={{ width: '100%', maxWidth: '80%' }}>
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
                                    sx={{ maxWidth: '200px', p: '10px 15px', m: '0 auto', display: 'block' }}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}