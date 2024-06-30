import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function FormRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const onSubmitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
    }

    return (
        <form onSubmit={onSubmitForm}>
            <TextField
                id="name"
                variant="standard"
                value={nomeRestaurante.value}
            />
            <Button variant="outlined"></Button>
        </form>
    )
}