import GlassList from "./Glasses/GlassList";

export default function Content() {
    return (
        <div className="wrapper mt-5 mb-5 w-50 m-auto bg-white px-3 py-5 border border-1 border-black">
            <div className="d-flex">
                <GlassList />
            </div>
        </div>
    )
}