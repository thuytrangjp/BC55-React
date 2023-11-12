export default function GlassItem({product, onClick}) {
    const {name, url} = product;
    const styling = {
        width: 100
    }

    return (
        <div className="product__item text-center" onClick={
            () => {
                onClick(product)
            }
        }>
            <img style={styling} src={url} alt={name}/>
            <p className="py-3">{name}</p>
        </div>
    );
}
