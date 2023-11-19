import React from 'react';

function MyCart( { myCart } ) {

    const modalSettings = {
        title: "My Cart",
        dialogClassName: "modal-dialog-scrollable"
    }

    if (myCart.length < 1) {
        return {
            modalSettings,
            content: (
                <div>
                    <p className="text-center mb-0">Nothing</p>
                </div>
            )
        }
    }

    return {
        modalSettings,
        content: (
            <div id="my-cart" className="mx-2">
                {
                    myCart.map( (item, index) => {
                        const { id, name, image, price, quantity, totalPrice } = item;
                        return (
                            <div key={id} className={
                                (index !== 0) ? "py-3" : "pb-3"
                            } style={
                                (index !== 0) ? {borderTop: "1px solid #9D9D9D"} : null
                            }>
                                <div className="productDetail d-flex gap-2
                                                justify-content-center align-items-center flex-row">
                                    <div className="productDetail_image">
                                        <img src={image} alt={name} width="100px" height="100px"
                                             style={{objectFit: "cover", objectPosition: "center",
                                                 transform: "translateY(15px)"}}/>
                                    </div>
                                    <div className="productDetail_infoTable w-75">
                                        <table className="w-100">
                                            <tbody>
                                                <tr>
                                                    <td className="px-2 py-1 fw-bold" colSpan={2}>Name:</td>
                                                    <td className="px-2 py-1" colSpan={8}>{ name }</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-2 py-1 fw-bold" colSpan={3}>Quantity:</td>
                                                    <td className="px-2 py-1" colSpan={2}
                                                        style={{textAlign:"right"}}
                                                        >{ quantity }</td>
                                                    <td className="px-2 py-1 fw-bold" colSpan={2}>Price:</td>
                                                    <td className="px-2 py-1" colSpan={3}
                                                        style={{textAlign:"right"}}
                                                    >{ new Intl.NumberFormat('en-US').format(price) } $
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-2 py-1" colSpan={5}></td>
                                                    <td className="px-2 py-1 fw-bold" colSpan={2}>Total:</td>
                                                    <td className="px-2 py-1" colSpan={3}
                                                        style={{textAlign:"right"}}>
                                                        { new Intl.NumberFormat('en-US').format(totalPrice) } $
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default MyCart;