

export const validURLConvert = (name:string)=>{
    const url = name?.toString().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-")
    return url
}