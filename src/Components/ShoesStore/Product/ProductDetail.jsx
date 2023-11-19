import React from 'react';

function ProductDetail( { item } ) {
    const { image, quantity, ...newItem} = item;
    const { id, name, price, shortDescription, description } = newItem;

    const modalSettings = {
        title: name,
        className: "modal-lg"
    }

    return {
        modalSettings,
        content: (
            <div className="productDetail d-flex gap-3 align-items-center flex-column flex-lg-row">
                <div className="productDetail_image">
                    <img src={image} alt={newItem.description} width="400px" height="200px"
                         style={{objectFit: "cover", objectPosition: "center", transform: "translateY(15px)"}}/>
                </div>
                <div className="productDetail_infoTable">
                    <table>
                        <tbody>
                        <tr style={{borderBottom:"1px solid #9D9D9D"}}>
                            <td className="px-2 py-3 fw-bold">ID</td>
                            <td className="px-2 py-3">{ id }</td>
                        </tr>
                        <tr style={{borderBottom:"1px solid #9D9D9D"}}>
                            <td className="px-2 py-3 fw-bold">Name</td>
                            <td className="px-2 py-3">{ name }</td>
                        </tr>
                        <tr style={{borderBottom:"1px solid #9D9D9D"}}>
                            <td className="px-2 py-3 fw-bold">Price</td>
                            <td className="px-2 py-3">{ price }</td>
                        </tr>
                        <tr style={{borderBottom:"1px solid #9D9D9D"}}>
                            <td className="px-2 py-3 fw-bold">About</td>
                            <td className="px-2 py-3">{ shortDescription }</td>
                        </tr>
                        <tr>
                            <td className="px-2 py-3 fw-bold">Detail</td>
                            <td className="px-2 py-3">{ description }</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ProductDetail;