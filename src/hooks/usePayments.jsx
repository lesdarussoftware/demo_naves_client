import { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";

import { PAYMENT_URL } from "../helpers/urls";

export function usePayments() {

    const { auth } = useContext(AuthContext)

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
        if (res.status === 200) setPayments(data)
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

    return { payments, getPayments, updatePayment }
}