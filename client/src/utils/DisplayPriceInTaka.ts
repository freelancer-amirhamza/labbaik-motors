export const DisplayPriceInTaka = (price)=>{
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "bdt"
    }).format(price)
}