
const ConfirmBox = ({ closeA, confirm, data }) => {

    return (
        <div className='fixed top-0 left-0 justify-center items-center  flex right-0 bottom-0 bg-neutral-800/80 '>
            <div className="w-full max-w-md gap-4 flex flex-col bg-amber-50 p-4 rounded ">
                <h1 className="text-lg text-amber-600 font-medium"> Permanent Delete!</h1>

                <h2 className="text-md text-neutral-800"> Do you want to delete this {data?.name && <strong>"{data?.name}"</strong>} Item.? </h2>
                <div className="flex items-center w-fit ml-auto  gap-4 px-1">
                    <button onClick={close} className="border  border-green-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-green-500 hover:text-white font-medium">Cancel</button>
                    <button onClick={confirm} className="border  border-red-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-red-500 hover:text-white font-medium">Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox