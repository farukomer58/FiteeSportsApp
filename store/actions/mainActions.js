
export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (product) => {
    // return { type: ADD_TO_CART, product: product }; OLD
    return async (dispatch, getState) => {
        console.log(getState())
        const token = getState().auth.token
        
    }
}