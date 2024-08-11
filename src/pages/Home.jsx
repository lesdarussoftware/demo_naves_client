import { useContext, useEffect } from "react";
import { IconButton, ImageList, ImageListItem, ImageListItemBar, Typography, Box, Tooltip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { CartContext } from "../providers/CartProvider";
import { useProducts } from "../hooks/useProducts";

import { Layout } from "../components/Layout";

import { SERVER_URL } from "../helpers/urls";

export function Home() {

    const { productsToBuy, setProductsToBuy } = useContext(CartContext)

    const { products, getProducts } = useProducts();

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Layout>
            <ImageList sx={{ width: '100%', margin: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <ImageListItem key={product.id} sx={{ width: '330px' }}>
                        <Carousel
                            showArrows={true}
                            showThumbs={false}
                            statusFormatter={(currentItem, total) => `${currentItem} de ${total}`}
                            infiniteLoop
                        >
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${SERVER_URL}/${image.name}.jpg`}
                                    alt={product.name}
                                    loading="lazy"
                                />
                            ))}
                        </Carousel>
                        <ImageListItemBar
                            title={
                                <Box>
                                    <Tooltip title={product.description} placement="top" arrow>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFF', cursor: 'pointer' }}>
                                            {product.name}
                                        </Typography>
                                    </Tooltip>
                                    <Typography variant="subtitle1" sx={{ color: '#FFF' }}>
                                        ${product.price}
                                    </Typography>
                                </Box>
                            }
                            position="below"
                            sx={{ backgroundColor: '#002561', color: '#FFF', pl: 2, pr: 1, alignItems: 'center', gap: 2 }}
                            actionIcon={
                                <IconButton
                                    sx={{
                                        color: '#FFF',
                                        transition: '200ms all',
                                        ':hover': { backgroundColor: '#FFF', color: '#002561' }
                                    }}
                                    aria-label={`add ${product.name} to cart`}
                                    disabled={productsToBuy.length > 0 && productsToBuy.map(p => p.title).includes(product.name)}
                                    onClick={() => setProductsToBuy([
                                        {
                                            title: product.name,
                                            unit_price: product.price,
                                            quantity: 1
                                        },
                                        ...productsToBuy
                                    ])}
                                >
                                    <AddShoppingCartIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Layout>
    );
}
