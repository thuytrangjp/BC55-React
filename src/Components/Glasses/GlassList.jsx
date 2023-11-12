import { useState } from "react";
import GlassItem from "./GlassItem";
import GlassInfo from "./GlassInfo";
import GlassPreview from "./GlassPreview";
import products from './../../Data/dataGlasses.json'

export default function GlassList() {
    const [glasses, setGlasses] = useState("");
    const handleSelect = (selected) => {
        setGlasses(selected);
    }

    return (
        <div className="wrapper">
            <div className="d-flex justify-content-around mb-5">
                <GlassInfo name={glasses.name} price={glasses.price} desc={glasses.desc} onBtnClick={handleSelect}/>
                <GlassPreview url={glasses.url}/>
            </div>
            <div className="d-flex flex-wrap justify-content-evenly gap-3">
                {products.map((product) => (
                    <GlassItem
                        key={product.id}
                        product={product}
                        onClick={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
