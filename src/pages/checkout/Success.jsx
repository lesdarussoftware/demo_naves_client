import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import { AuthContext } from "../../providers/AuthProvider";
import { usePayments } from "../../hooks/usePayments";

import { Layout } from "../../components/Layout";

export function Success() {

    const { auth } = useContext(AuthContext)

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const { updatePayment } = usePayments()

    useEffect(() => {
        if (auth) {
            const payment_id = searchParams.get('payment_id')
            const status = searchParams.get('status')
            const external_reference = searchParams.get('external_reference')
            if (payment_id && status && status === 'approved' && external_reference === auth.user.id) {
                updatePayment(payment_id)
            }
        } else {
            return navigate('/')
        }
    }, [])

    return (
        <Layout>
            <Typography variant="h4" align="center" marginBottom={3} marginTop={5}>
                ¡El pago fue registrado con éxito!
            </Typography>
            <Button variant="contained" sx={{ display: 'block', margin: 'auto' }} onClick={() => navigate('/')}>
                Volver al inicio
            </Button>
            <Button
                variant="contained"
                sx={{ display: 'block', margin: 'auto', mt: 2 }}
                onClick={() => navigate('/pagos')}
            >
                Mis pagos
            </Button>
        </Layout>
    )
}