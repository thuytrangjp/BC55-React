export default function GlassPreview({url}) {
    return (
        <div className="preview text-center w-50">
            <img src="./glassesImages/model.jpg" alt=""
                 className="preview text-center"
            />
            <img src={url} alt="" className="selectedPreview" />
        </div>
    )
}