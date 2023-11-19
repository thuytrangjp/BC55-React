import React from 'react';
import shoesStore from '../../../Data/shoes.json'
import ProductItem from "./ProductItem";

function ProductList({action}) {
    return (
        <div className="row">
            {
                shoesStore.map((shoes) => {
                    return (
                        <ProductItem key={shoes.id} item={shoes} action={action} />
                    )
                })
            }
        </div>
    );
}

export default ProductList;