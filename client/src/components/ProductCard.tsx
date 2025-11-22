import React from 'react';
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';
import { validURLConvert } from '../utils/validURLConvert';
import { Link } from 'react-router-dom';
import { priceWithDiscount } from '../utils/priceWithDiscount';
import AddToCartButton from './AddToCartButton';


const ProductCard = ({data}) => {
    const url = `/product/${validURLConvert(data.name)}-${(data._id)}`

  return (
    <Link to={url} className=' border border-blue-200 p-2 grid hover:shadow-lg gap-1 hover:scale-105 duration-300 max-w-56 min-w-42 max-h-88 min-h-80 rounded '>
        <div className="min-h-20 rounded">
        <img src={data.image[0] } alt={data?.name} className='w-full h-full object-scale-down' />
        </div>
        <div className="flex items-center justify-between gap-0.5">
        <div className="bg-orange-200/70  p-0.5 rounded text-orange-900  text-sm">{data?.stock} Left</div>
        {data?.discount > 0 && <div className="bg-green-200/70  p-0.5 rounded text-green-900 text-sm"> {data.discount}% Discount</div> }

        </div>
        <div className="text-neutral-800 text-md text-ellipsis line-clamp-2 rounded">{data?.name} </div>
        <div className=" text-neutral-800 text-md text-ellipsis line-clamp-2 rounded  ">Unit: {data?.unit} </div>
        <div className="flex items-center justify-between gap-1">
        <div className="p-1 bg-blue-100/80 rounded  "> {DisplayPriceInTaka(priceWithDiscount(data?.price, data?.discount))} </div>
        {data?.stock ==0 ? ( <p className="text-orange-600 text-sm font-light ">Stock Out!</p>
      ) : (<AddToCartButton data={data}/>)}
        </div>
    </Link>
  )
}

export default ProductCard