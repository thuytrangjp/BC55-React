import React from 'react';
import ProductItem from "./ProductItem";

function ProductList({productItems, action}) {
    return (
        <div className="my-5 container">
            <h1 className="text-center">Shoes Store</h1>
            <div className="row">
                {
                    productItems.map((item) => {
                        return (
                            <ProductItem key={item.id} item={item} action={action} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ProductList;