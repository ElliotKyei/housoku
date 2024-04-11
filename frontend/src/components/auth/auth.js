import { useEffect } from "react";
import { getAuthStatus } from "../../reducers/user/userSlice";
import { dbGetShoppingCart, } from "../../reducers/shoppingCart/shoppingCartSlice";
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';

export default function Auth() {
    const location = useLocation()
    const dispatch = useDispatch();

    // When app renders or changes location, get authentication state and shopping cart

    useEffect(() => {
        dispatch(getAuthStatus());
        dispatch(dbGetShoppingCart());
    }, [location]);



    return null
}
