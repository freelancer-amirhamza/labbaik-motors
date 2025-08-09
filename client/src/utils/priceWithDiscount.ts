export const priceWithDiscount = (price, discount)=>{
    if(discount){
        const discountAmount = Math.ceil((Number(price) * Number(discount)) / 100)
        const actualPrice = Number(price) - Number(discountAmount);
        return actualPrice.toFixed(2)
    }
}