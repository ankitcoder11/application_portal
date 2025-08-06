import { Link } from "react-router-dom"
import { ButtonLink } from "./utiles/Button"

const Home = () => {
    return (
        <section className="relative h-[calc(100vh-100px)] flex items-center justify-center">
            <div className="w-full flex flex-col gap-[24px] max-[800px]:gap-3 items-center justify-center max-w-6xl mx-auto text-center text-[#222222] ">
                <h1 className="text-6xl max-[800px]:text-5xl font-bold leading-tight">
                    Join Our <span className="text-blue-600">Innovative</span> Team
                </h1>
                <p className="text-2xl max-[800px]:text-xl mb-2 max-w-3xl mx-auto leading-relaxed opacity-90">
                    Build the future with us. We're looking for passionate individuals who want to make a meaningful impact in technology and innovation.
                </p>
                <Link to={"/jobs"} className="w-[20%] block max-[800px]:w-1/2 "><ButtonLink text='View Open Positions' color='white' bg='#222222' /></Link>
            </div>
        </section>
    )
}

export default Home