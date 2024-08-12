import { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { MpContext } from "../providers/MpProvider";

import { CHECKOUT_URL } from "../helpers/urls";

export function useCheckout() {

    const { auth } = useContext(AuthContext)
    const { setPreferenceId } = useContext(MpContext)

    const [cartConfirmed, setCartConfirmed] = useState(false)
    const [loading, setLoading] = useState(false)

    async function createPreference(items) {
        const res = await fetch(CHECKOUT_URL + '/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            },
            body: JSON.stringify(items)
        })
        const data = await res.json()
        if (res.status === 201) {
            setPreferenceId(data.id)
            setLoading(false)
        }
    }

    async function sendTransactionSignature({ account, amount, r, s, v }) {
        const res = await fetch(CHECKOUT_URL + '/transaction-signature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth?.token
            },
            body: JSON.stringify({ account, amount, r, s, v })
        })
        const data = await res.json()
        setLoading(false)
        console.log(data.message)
    }

    return {
        loading,
        setLoading,
        cartConfirmed,
        setCartConfirmed,
        createPreference,
        sendTransactionSignature
    }
}