import { ADD_TO_CART,  REMOVE_FROM_CART}  from "./cartActionTypes";

export const addToCart = (product,size) => {
    return {
        type: ADD_TO_CART,
        product,
        size: size
    };
};
export const removeFromCart = product => {
    return {
        type: REMOVE_FROM_CART,
        product,
    };
};