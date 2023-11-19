import React from 'react';
function ProductItem({ item: shoes, action } ) {
    const { image, name, price } = shoes;
    const { handleShowProductModal } = action;

    return (
        <div className="listItem m-auto col-lg-4 col-md-6 p-3">
            <div className="border p-4" >
                <div className="listItem__itemCard d-flex justify-content-center flex-column"
                     onClick={() => handleShowProductModal( "ProductDetail",  shoes )}
                     data-bs-toggle="modal" data-bs-target="#baseModal">
                    <img src={ image } alt={ name } className="itemCard__image align-self-center mb-3"
                         style={{ height: 280, width: 280 }}/>
                    <div>
                        <h5 className="itemCard__title">{ name }</h5>
                        <p className="itemCard__price">{ price } $</p>
                    </div>
                </div>
                <div className="listItem__itemAction">
                    <button className="btn btn-dark"
                            onClick={() => handleShowProductModal( "AddToCart", shoes )}
                            data-bs-toggle="modal" data-bs-target="#baseModal">
                        <span style={{ marginRight: 10 }}>Add to carts</span>
                        <i className="bi-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;