import { useEffect } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

import { useProducts } from "../hooks/useProducts";

import { Layout } from "../components/Layout";
import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import { SERVER_URL } from "../helpers/urls";

export function Home() {

    const { products, getProducts } = useProducts()

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Layout>
            <ImageList sx={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <ImageListItem key={product.id} sx={{ width: '300px' }}>
                        <img
                            src={`${SERVER_URL}/${product.images[0].name}.jpg`}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={product.name}
                            subtitle={product.description}
                            sx={{ backgroundColor: 'rgba(0, 37, 97, 0.8)' }}
                            actionIcon={
                                <IconButton
                                    sx={{ color: '#FFF' }}
                                    aria-label={`info about ${product.name}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Layout>
    )
}