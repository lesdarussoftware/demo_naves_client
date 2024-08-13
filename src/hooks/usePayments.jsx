import { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { MessageContext } from "../providers/MessageProvider";

import { PAYMENT_URL } from "../helpers/urls";
import { OK } from "../helpers/status-codes";

export function usePayments() {

    const { auth } = useContext(AuthContext)
    const { setMessage, setOpenMessage, setSeverity } = useContext(MessageContext)

    const [payments, setPayments] = useState([])

    async function getPayments() {
        const res = await fetch(PAYMENT_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            }
        })
        const data = await res.json()
        if (res.status === OK) setPayments(data)
    }

    async function updatePayment(payment_id) {
        await fetch(`${PAYMENT_URL}/${payment_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            },
            body: '{}'
        })
    }

    async function handleClaimReward({ payment_id, recipient }) {
        const res = await fetch(`${PAYMENT_URL}/claim-reward?payment_id=${payment_id}&recipient=${recipient}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            }
        })
        const { message, updated_payment } = await res.json()
        if (res.status === OK) {
            setPayments([...payments.filter(p => p.id !== updated_payment.id), updated_payment].sort((a, b) => a.id - b.id))
            setSeverity('success')
            setMessage(message)
        } else {
            setSeverity('error')
            setMessage('Ocurrió un error.')
        }
        setOpenMessage(true)
    }

    return { payments, getPayments, updatePayment, handleClaimReward }
}