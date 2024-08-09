import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

export function Success() {

    const navigate = useNavigate()

    return (
        <Box>
            Success
            <Button variant="contained" onClick={() => navigate('/')}>
                Volver
            </Button>
        </Box>
    )
}