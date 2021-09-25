// Set data in localStorage

const addDb = id => {
    const exists = getDb();
    let cart = {};
    if (!exists) {
        cart[id] = 1
    } else {
        cart = JSON.parse(exists);
        if (cart[id]) {
            const newCount = cart[id] + 1;
            cart[id] = newCount;
        } else {
            cart[id] = 1
        }
    }
    updateLocalStorage(cart)

}

const getDb = () => localStorage.getItem("cart");
const updateLocalStorage = cart => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

const getStorageCart = () => {
    const exists = getDb();
    return exists ? JSON.parse(exists) : {};
}

const deleteItemFromCart = id => {
    const exists = getDb();
    if (!exists) {

    } else {
        const cart = JSON.parse(exists);
        delete cart[id];
        updateLocalStorage(cart)

    }
}

const clearFromCart = () => {
    localStorage.clear()
}

export { addDb, getStorageCart, deleteItemFromCart, clearFromCart };