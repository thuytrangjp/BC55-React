export default function GlassInfo({name, price, desc, onBtnClick}) {
    return (
        <div className="info w-50 p-3">
            <h4 className="pb-3"><strong>Information</strong></h4>
            { name ?
                (
                    <div>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Price:</strong> {price}$</p>
                        <p><strong>Description:</strong>
                            <p>{desc}</p>
                        </p>
                        <button className="btn btn-primary" onClick={() => onBtnClick({})}>Remove from Preview</button>
                    </div>
                )
                : <p>Please select one</p>
            }
        </div>
    )
}
