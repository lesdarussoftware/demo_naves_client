import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { Layout } from "../../components/Layout";

export function Success() {

    const navigate = useNavigate()

    return (
        <Layout>
            <Typography variant="h4" align="center" marginBottom={3} marginTop={5}>
                ¡El pago fue registrado con éxito!
            </Typography>
            <Button variant="contained" sx={{ display: 'block', margin: 'auto' }} onClick={() => navigate('/')}>
                Volver al inicio
            </Button>
        </Layout>
    )
}