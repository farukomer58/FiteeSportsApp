import { ADD_TO_CART } from "../actions/mainActions";
// import CartItem from "../../models/cart-item";

const initialState = {
    token: '',              // Logged in User Token   
    isAuthenticated: false, // Is User logged in or not
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            // const addedProduct = action.product;
            // const productPrice = addedProduct.price
            // const productTitle = addedProduct.title

            // let updatedOrNewCartItem;

            // // Already have the item in the cart
            // if (state.items[addedProduct.id]) {
            //     updatedOrNewCartItem = new CartItem(state.items[addedProduct.id].quantity + 1, productPrice, productTitle, state.items[addedProduct.id].sum + productPrice)
            // } else { // Add new Item to the Cart
            //     updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice)
            // }
            // return { ...state, items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem }, totalAmount: state.totalAmount + productPrice }
            return state
        default:
            return state
    }
}