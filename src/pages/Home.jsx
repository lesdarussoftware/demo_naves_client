import { useContext } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { Box, Button } from "@mui/material";

import { MpContext } from "../providers/MpProvider";
import { useCheckout } from "../hooks/useCheckout";

export function Home() {

    const { preferenceId } = useContext(MpContext)

    const { createPreference } = useCheckout()

    return (
        <Box>
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
        </Box>
    )
}