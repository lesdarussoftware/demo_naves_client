import { useContext, useState } from "react";

import { MpContext } from "../providers/MpProvider";

import { CHECKOUT_URL } from "../helpers/urls";

export function useCheckout() {

    const { setPreferenceId } = useContext(MpContext)

    const [loading, setLoading] = useState(false)

    async function createPreference(order) {
        const res = await fetch(CHECKOUT_URL + '/create-preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        const data = await res.json()
        if (res.status === 201) {
            setPreferenceId(data.id)
            setLoading(false)
        }
    }

    return {
        loading,
        setLoading,
        createPreference
    }
}