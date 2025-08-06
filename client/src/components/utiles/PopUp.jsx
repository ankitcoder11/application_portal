import { RxCross2 } from "react-icons/rx"

const PopUp = ({ children, close }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 flex justify-between gap-2">
                    <div className="w-[95%] ">{children}</div>
                    <div
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer text-xl"
                        onClick={close}
                    >
                        <RxCross2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUp