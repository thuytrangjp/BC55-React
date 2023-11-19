import React from 'react';

function AddToCart( { currentQuantity, item, action } ) {
    const { id, name, quantity: stock } = item;
    const { handleUpdateProductInMyCart } = action;
    let hasError = true;
    let quantity = currentQuantity;

    const modalSettings = {
        title: "Add To Cart: " + name,
        actionButtons: [{
            label: "Add To Cart",
            attributes: {
                id: "add-to-cart-btn",
                type: "button",
                className: currentQuantity > 0 ? "btn btn-primary" : "btn btn-primary disabled",
                "data-bs-dismiss": "modal",
                onClick: () => {
                    hasError = checkValidation();
                    if (!hasError) {
                        handleUpdateProductInMyCart( item, quantity);
                    }
                }
            }
        },{
            label: "Remove",
            attributes: {
                id: "remove-from-cart-btn",
                type: "button",
                className: currentQuantity > 0 ? "btn btn-danger" : "btn btn-danger disabled",
                "data-bs-dismiss": "modal",
                onClick: () => {
                    handleUpdateProductInMyCart( { id }, 0);
                }
            }
        }],
    }

    const checkValidation = () => {
        let input = document.getElementById("quantity").value * 1;
        let err = "";
        switch (true) {
            case input > 0 && input < 100 && input <= stock: quantity = input; break;
            case input < 1: err = "Please choose a valid amount"; break;
            case input > 99: err = "Please enter a number less than 100"; break;
            case input > stock: err = "There is not enough stock"; break;
            default: err = "Please input the field"; break;
        }

        document.getElementById("quantityError").innerText = err;

        if (err) {
            hasError = true;
            document.getElementById("quantityError").display = "none";
            document.getElementById("add-to-cart-btn").classList.add("disabled");
        } else {
            hasError = false;
            document.getElementById("quantityError").display = "block";
            document.getElementById("add-to-cart-btn").classList.remove("disabled");
        }

        return err
    }

    const content = (
        <div className="px-5 d-flex flex-column gap-3">
            <div className="row">
                <div className="col-auto">
                    <label className="col-form-label" htmlFor="quantity">Select Quantity</label>
                </div>
                <div className="col-auto">
                    <input className="form-control" style={{borderColor: "#B8B8B8"}}
                        type="text" name="quantity" id="quantity" defaultValue={quantity}
                        onChange={ checkValidation }>
                    </input>
                </div>
            </div>
            <div>
                <p id="quantityError" className="form-text" style={{color:"red", marginBottom:"0"}}></p>
            </div>
        </div>
    )

    return {
        modalSettings,
        content
    }
}

export default AddToCart;