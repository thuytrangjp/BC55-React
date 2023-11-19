import React, {useEffect, useState} from 'react';
import productItems from '../../Data/shoes.json'
import ProductList from "./Product/ProductList";
import ProductDetail from "./Product/ProductDetail";
import AddToCart from "./Cart/AddToCart";
import Modal from "../Modal";
import MyCart from "./Cart/MyCart";
import Header from "../Header";
import Footer from "../Footer";

function ShoesStore() {
    const [ modalContent, setModalContent ] =  useState( null );
    const [ modalSettings, setModalSettings ] =  useState( {} );
    const [ myCart, setMyCart ] = useState(JSON.parse(localStorage.getItem("myCart")) || []);

    const handleShowProductModal = ( contentType, focusItem ) => {
        if (!focusItem) return null;
        const currentQuantity = myCart.find(e => e.id === focusItem.id )?.quantity;
        switch (contentType) {
            case "AddToCart" :
                let { modalSettings: modalAddToCartSettings, content: modalAddToCartContent } =
                    AddToCart({currentQuantity, item: focusItem,
                        action: {handleUpdateProductInMyCart}})
                setModalSettings(modalAddToCartSettings);
                setModalContent(modalAddToCartContent);
                break;
            case "ProductDetail" :
                let { modalSettings: modalProductDetailSettings, content: modalProductDetailContent } =
                    ProductDetail({item: focusItem})
                setModalSettings(modalProductDetailSettings);
                setModalContent(modalProductDetailContent);
                break;
            default: break;
        }
    }

    const handleShowCartModal =  () => {
        let { modalSettings: modalCartSettings, content: modalCartContent } =
            MyCart({ myCart, action: {handleUpdateProductInMyCart}})
        setModalSettings(modalCartSettings);
        setModalContent(modalCartContent);
    }

    const handleCloseModal = () => {
        setModalContent(null);
        setModalSettings({});
    }

    const handleUpdateProductInMyCart = (item, quantity) => {
        const { id, name, image, price } = item;
        const cart = [...myCart];
        let itemCartIndex = cart.findIndex((element) => element.id === id);
        let target = {
            id,
            image,
            name,
            price,
            quantity,
            totalPrice: quantity * price
        }

        switch (true) {
            case itemCartIndex > -1 && quantity > 0: cart[itemCartIndex] = target; break;
            case itemCartIndex > -1 && quantity <= 0 : cart.splice(itemCartIndex, 1); break;
            case itemCartIndex <= -1 && quantity > 0 : cart.push(target); break;
            default: break;
        }

        setMyCart(cart);
        handleCloseModal();
    }

    useEffect(() => {
        localStorage.setItem("myCart", JSON.stringify(myCart));
    }, [myCart])

    return (
        <div>
            <div className="shoesStore">
                <Header action={{ handleShowCartModal }}/>
                <ProductList productItems={productItems} action={{ handleShowProductModal, handleUpdateProductInMyCart }}/>
                <Modal props={{ modalSettings, modalContent }} action={{ handleCloseModal }}/>
                <Footer />
            </div>
        </div>
    );
}

export default ShoesStore;