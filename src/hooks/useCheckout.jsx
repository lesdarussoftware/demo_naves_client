import { useContext, useState } from "react";
import { ethers } from "ethers";

import { AuthContext } from "../providers/AuthProvider";
import { MpContext } from "../providers/MpProvider";
import { MetamaskContext } from "../providers/MetamaskProvider";

import { CHECKOUT_URL } from "../helpers/urls";
import { CREATED } from "../helpers/status-codes";

export function useCheckout() {

    const { auth } = useContext(AuthContext)
    const { setPreferenceId } = useContext(MpContext)
    const { contract } = useContext(MetamaskContext)

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
            console.log('Pago realizado con éxito.')
        } catch (err) {
            console.log(err)
        }
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