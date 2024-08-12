import { Typography } from "@mui/material";

import { Layout } from "../components/Layout";

export function Error() {
    return (
        <Layout>
            <Typography variant="h5" align="center" marginTop={5}>
                Página no encontrada.
            </Typography>
        </Layout>
    )
}