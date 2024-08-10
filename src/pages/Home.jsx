import { useContext } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { Button } from "@mui/material";

import { MpContext } from "../providers/MpProvider";
import { useCheckout } from "../hooks/useCheckout";
import { Layout } from "../components/Layout";

export function Home() {

    const { preferenceId } = useContext(MpContext)

    const { createPreference } = useCheckout()

    return (
        <Layout>
            <Button variant="contained" onClick={() => createPreference({
                title: 'esto es una prueba',
                unit_price: '22',
                quantity: '1'
            })}>
                Confirmar
            </Button>
            {preferenceId &&
                <Wallet
                    initialization={{ preferenceId }}
                    customization={{ texts: { valueProp: 'smart_option' } }}
                />
            }
        </Layout>
    )
}