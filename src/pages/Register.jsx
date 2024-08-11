import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, FormControl, Input, InputLabel, Typography } from "@mui/material"

import { AuthContext } from "../providers/AuthProvider"
// import { MessageContext } from "../../providers/MessageProvider"
import { useForm } from "../hooks/useForm"
// import { useAuth } from "../hooks/useAuth"

import { Layout } from "../components/Layout"

import { AUTH_URL } from "../helpers/urls"

export function Register() {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    // const { setOpenMessage, setSeverity, setMessage } = useContext(MessageContext)
    const { formData, errors, disabled, setDisabled, handleChange, validate } = useForm({
        defaultData: { name: '', email: '', password: '' },
        rules: {
            name: { required: true, maxLength: 55 },
            email: { required: true, maxLength: 55 },
            password: { required: true, minLength: 8, maxLength: 191 }
        }
    })
    // const { login } = useAuth()

    useEffect(() => {
        if (auth) return navigate('/')
    }, [auth])

    async function handleSubmit(e) {
        e.preventDefault()
        if (validate()) {
            const res = await fetch(AUTH_URL + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (res.status === 201) {
                console.log(data.message)
                navigate('/login')
            } else {
                setDisabled(false)
            }
        } else {
            setDisabled(false)
        }
    }

    return (
        <Layout>
            <Box sx={{ width: '30%', margin: 'auto', mt: 20 }}>
                <form onChange={handleChange} onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <FormControl>
                            <InputLabel htmlFor="name" sx={{ color: '#000' }}>Nombre</InputLabel>
                            <Input id="name" type="text" name="name" value={formData.name} sx={{ color: '#000' }} />
                            {errors.name?.type === 'required' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * El nombre es requerido.
                                </Typography>
                            }
                            {errors.name?.type === 'maxLength' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * El nombre es demasiado largo.
                                </Typography>
                            }
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="email" sx={{ color: '#000' }}>Email</InputLabel>
                            <Input id="email" type="email" name="email" value={formData.email} sx={{ color: '#000' }} />
                            {errors.email?.type === 'required' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * El email es requerido.
                                </Typography>
                            }
                            {errors.email?.type === 'maxLength' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * El email es demasiado largo.
                                </Typography>
                            }
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password" sx={{ color: '#000' }}>Contraseña</InputLabel>
                            <Input id="password" type="password" name="password" value={formData.password} sx={{ color: '#000' }} autoComplete="" />
                            {errors.password?.type === 'required' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * La contraseña es requerida.
                                </Typography>
                            }
                            {errors.password?.type === 'minLength' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * La contraseña es demasiado corta.
                                </Typography>
                            }
                            {errors.password?.type === 'maxLength' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * La contraseña es demasiado larga.
                                </Typography>
                            }
                        </FormControl>
                        <FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: '50%',
                                    margin: '0 auto',
                                    marginTop: 1,
                                    color: '#fff'
                                }}
                                disabled={disabled}
                            >
                                Registrarse
                            </Button>
                        </FormControl>
                    </Box>
                </form>
            </Box>
        </Layout>
    )
}