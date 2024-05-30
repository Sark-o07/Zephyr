import React, { createContext, useState, useEffect } from "react";


export const ShopContext = createContext(null);


export const getDefaultCart = () =>{
    let cart = {};
    for (let itemId = 0; itemId < 300 + 1; itemId++) {
        cart[itemId] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [allProducts, setAll_Products] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if authentication token exists in localStorage
        const authToken = localStorage.getItem('auth-token');
        console.log(cartItems, "on loading the website");
        if (authToken) {
          setIsAuthenticated(true);

          fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: "",
          })
          .then((res) => res.json())
          .then((data) => {
            setCartItems(data);
            console.log(cartItems, "if user is authenticated")
        })
        } else {
          setIsAuthenticated(false);
        };

        fetch('http://localhost:4000/allproducts')
        .then((res) => res.json())
        .then((data) => {
            setAll_Products(data);
        });
    }, []);

    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems, "after clicking add to cart")
        if (isAuthenticated) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId}),
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        } else {
            console.log(' the addtocart_api never triggered')
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if (isAuthenticated) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId}),
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        } else {
            console.log(' the removefromcart_api never triggered')
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems)
        {
            if(cartItems[itemId]>0)
            {
                let itemInfo = allProducts.find(product => product.id === Number(itemId));
                totalAmount += itemInfo.new_price * cartItems[itemId];
            }
        }
        return totalAmount;
        
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItems += cartItems[item]
            }
        }
        return totalItems;
    }

    const contextValue = { allProducts, cartItems, isAuthenticated, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, setCartItems, setIsAuthenticated };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;