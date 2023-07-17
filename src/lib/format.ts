export default function formatPrice(price: string){

        const actualPrice = parseInt(price);

    return (actualPrice/100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })
}