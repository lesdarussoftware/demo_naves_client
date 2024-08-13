import { useContext, useState } from "react";
import { ethers } from "ethers";

import { AuthContext } from "../providers/AuthProvider";
import { MpContext } from "../providers/MpProvider";
import { MetamaskContext } from "../providers/MetamaskProvider";
import { MessageContext } from "../providers/MessageProvider";

import { CHECKOUT_URL } from "../helpers/urls";
import { CREATED } from "../helpers/status-codes";

export function useCheckout() {

    const { auth } = useContext(AuthContext)
    const { setPreferenceId } = useContext(MpContext)
    const { contract } = useContext(MetamaskContext)
    const { setSeverity, setMessage, setOpenMessage } = useContext(MessageContext)

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
        if (res.status === CREATED) {
            setPreferenceId(data.id)
            setLoading(false)
        }
    }

    const handlePayWithLds = async (amount, action) => {
        setLoading(true)
        try {
            const amountInWei = ethers.parseUnits(amount, 18);
            await contract.depositLDS(amountInWei)
            action()
            setSeverity('success')
            setMessage('Pago realizado con éxito.')
        } catch (err) {
            console.log(err)
            setSeverity('error')
            setMessage('Ocurrió un error.')
        }
        setOpenMessage(true)
    }

    return {
        loading,
        setLoading,
        cartConfirmed,
        setCartConfirmed,
        createPreference,
        handlePayWithLds
    }
}