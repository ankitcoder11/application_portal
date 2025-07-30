
const Button = ({ text, onClick, bg, border, color, isLoading }) => {
    return (
        <button
            className=' text-center p-[10px] w-full font-bold rounded-md text-[#333333] cursor-pointer '
            onClick={(e) => { e.preventDefault(); onClick(); }}
            style={{ backgroundColor: bg, borderWidth: border, borderColor: 'black', color: color }}
        >
            {isLoading ? (
                <div className="mx-auto border-white h-[23px] w-[23px] animate-spin rounded-full border-[3px] border-t-black" />
            ) : (
                <span>{text}</span>
            )}
        </button>
    )
}

export default Button

const ButtonLink = ({ text, bg, border, color, isLoading }) => {
    return (
        <button
            className=' text-center p-[10px] w-full font-bold rounded-md text-[#333333] cursor-pointer '
            style={{ backgroundColor: bg, borderWidth: border, borderColor: 'black', color: color }}
        >{text}
        </button>
    )
}

export { ButtonLink }