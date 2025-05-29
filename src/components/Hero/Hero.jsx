import './Hero.css'
const images = [

    "/pianta3.jpg",
    "/pianta5.jpg",
    "/pianta4.jpg",
    "/pianta6.jpg",


]

export default function Hero() {

    return (
        <div className="container_hero">

            {images.map((img, i) => (
                <img key={i} src={img} />

            ))}</div>
    )
};