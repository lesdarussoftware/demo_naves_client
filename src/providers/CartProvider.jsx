import { createContext, useState } from "react";

export const CartContext = createContext({
    showCart: false,
    setShowCart: () => { },
    productsToBuy: [],
    setProductsToBuy: () => { }
})

export function CartProvider({ children }) {

    const [showCart, setShowCart] = useState(false)
    const [productsToBuy, setProductsToBuy] = useState([])

    return (
        <CartContext.Provider value={{ showCart, setShowCart, productsToBuy, setProductsToBuy }}>
            {children}
        </CartContext.Provider>
    )
}