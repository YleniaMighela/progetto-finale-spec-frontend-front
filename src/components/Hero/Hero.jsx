import './Hero.css'
const images = [

    "/pianta3.jpg",
    "/pianta5.jpg",
    "/pianta4.jpg",
    "/pianta6.jpg",


]

export default function Hero() {

    return (
        <>
            <section className='section_hero'>
                <p className="hero_text">
                    “Le piante non sono solo decorazioni: sono piccoli miracoli verdi che portano energia, freschezza e armonia. Naviga tra le nostre selezioni, scopri i segreti di ogni specie e scegli quella che saprà accompagnarti giorno dopo giorno con la sua vitalità.”
                </p>
                <div className="container_hero">
                    {images.map((img, i) => (
                        <img key={i} src={img} alt={`pianta ${i + 1}`} />
                    ))}
                </div>
            </section>

        </>

    )
};