import { createContext, useState } from "react";
import { initMercadoPago } from '@mercadopago/sdk-react'

import { VITE_APP_MP_PUBLIC_KEY } from "../helpers/env";

export const MpContext = createContext({
    preferenceId: null,
    setPreferenceId: () => { }
})

export function MpProvider({ children }) {

    initMercadoPago(VITE_APP_MP_PUBLIC_KEY)

    const [preferenceId, setPreferenceId] = useState(null)

    return (
        <MpContext.Provider value={{ preferenceId, setPreferenceId }}>
            {children}
        </MpContext.Provider>
    )
}