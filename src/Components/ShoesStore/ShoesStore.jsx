import React, {useEffect, useState} from 'react';
import ProductList from "./Product/ProductList";
import ProductDetail from "./Product/ProductDetail";
import AddToCart from "./Cart/AddToCart";
import Modal from "../Modal";

function ShoesStore() {
    const [ modalContent, setModalContent ] =  useState( null );
    const [ modalSettings, setModalSettings ] =  useState( {} );
    const showModal = ( hasActionButton, contentType, focusItem, modalTitle, modalClass ) => {
        setModalSettings({
            hasActionButton, modalTitle, modalClass
        })
        setModalContent(() => {
            switch (contentType) {
                case "AddToCart" : return ( <AddToCart item={ focusItem } action={ updateMyCart } /> );
                case "ProductDetail" : return (<ProductDetail  item={ focusItem } /> );
                default: return "";
            }
        });
    }

    const [ myCart, setMyCart ] = useState(JSON.parse(localStorage.getItem("myCart")) || []);
    useEffect(() => {
        localStorage.setItem("myCart", JSON.stringify(myCart));
    }, [myCart])
    const updateMyCart = (data) => {
        setMyCart(data);
    }

    return (
        <div className="shoesStore">
            <ProductList action={{ showModal }}/>
            <Modal props={{ modalContent, modalSettings }}/>
        </div>
    );
}

export default ShoesStore;