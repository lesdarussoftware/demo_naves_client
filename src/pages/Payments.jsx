import { useContext, useEffect } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from 'date-fns'

import { MetamaskContext } from "../providers/MetamaskProvider";
import { usePayments } from "../hooks/usePayments";
import { useMetamask } from "../hooks/useMetamask";

import { Layout } from "../components/Layout";

export function Payments() {

    const { account } = useContext(MetamaskContext)

    const { payments, getPayments, handleClaimReward } = usePayments()
    const { connectMetaMask } = useMetamask()

    useEffect(() => {
        getPayments()
    }, [])

    return (
        <Layout>
            {!account &&
                <Box mt={1} mb={2}>
                    <Button
                        variant="contained"
                        onClick={() => connectMetaMask()}
                    >
                        Conectar con MetaMask
                    </Button>
                </Box>
            }
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
                            payments.sort((a, b) => a.id - b.id).map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell align="center">{payment.id}</TableCell>
                                    <TableCell align="center">{payment.mp_id}</TableCell>
                                    <TableCell align="center">
                                        {format(new Date(payment.created_at), 'dd/MM/yyyy HH:MM:ss')}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            disabled={!account || payment.rewarded}
                                            onClick={() => handleClaimReward({
                                                payment_id: payment.mp_id,
                                                recipient: account
                                            })}
                                        >
                                            {payment.rewarded ? 'Cobrado' : 'Reclamar'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}