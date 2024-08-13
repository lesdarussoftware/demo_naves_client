import { useState } from "react";

import { PRODUCT_URL } from "../helpers/urls";
import { OK } from "../helpers/status-codes";

export function useProducts() {

    const [products, setProducts] = useState([])

    async function getProducts() {
        const res = await fetch(PRODUCT_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if (res.status === OK) setProducts(data)
    }

    return { products, getProducts }
}