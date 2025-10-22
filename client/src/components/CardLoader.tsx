

const CardLoader = () => {
  return (
    <div className=' border border-blue-200 p-2 grid gap-3 max-w-52 rounded animate-pulse'>
        <div className="min-h-20 bg-blue-100/80 rounded"></div>
        <div className="p-3 bg-blue-100/80 rounded w-20"></div>
        <div className="p-3 bg-blue-100/80 rounded"></div>
        <div className="p-3 bg-blue-100/80 rounded w-14 "></div>
        <div className="flex items-center justify-between gap-3">
        <div className="p-3 bg-blue-100/80 rounded w-20  "></div>
        <div className="p-3 bg-blue-100/80 rounded w-20 "></div>
        </div>
    </div>
  )
}

export default CardLoader