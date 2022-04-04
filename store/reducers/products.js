import PRODUCTS from "../../data/dummy-data";

const initialState = {
    availableProducts: PRODUCTS,                                                // All Products
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),         // Own Products
};

export default (state = initialState, action) => {
    return state;
}

