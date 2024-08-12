import { useEffect } from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from 'date-fns'

import { usePayments } from "../hooks/usePayments";

import { Layout } from "../components/Layout";

export function Payments() {

    const { payments, getPayments } = usePayments()

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <Layout>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell align="center">Id MP</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Recompensa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.length === 0 ?
                            <TableRow>
                                <TableCell align="center" colSpan={4}>No hay pagos registrados.</TableCell>
                            </TableRow> :
                            payments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell align="center">{payment.id}</TableCell>
                                    <TableCell align="center">{payment.mp_id}</TableCell>
                                    <TableCell align="center">
                                        {format(new Date(payment.created_at), 'dd/MM/yyyy HH:MM:ss')}
                                    </TableCell>
                                    <TableCell align="center">
                                        {payment.rewarded ?
                                            'No disponible' :
                                            <Button variant="contained">
                                                Reclamar
                                            </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}