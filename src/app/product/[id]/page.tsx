import PriceTag from "@/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import AddToCartButton from "./AddToCartButton"
import { incrementProductQuantity } from "./actions"


interface ProductPageProps{
    params: {
        id: string
    }
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: {id}})

    if(!product){
        notFound();
    }

    return product
})

export async function generateMetadata(
    {params: {id}}: ProductPageProps
): Promise<Metadata> {
    const product = await getProduct(id)

    return {
        title: product.name + " - ecommerce",
        description: product.description
    }
}

export default async function ProductPage(
    {params: {id}}: ProductPageProps
) {

   const product = await getProduct(id)

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <Image src={product.imageUrl} alt={product.name} className="rounded-lg" priority width={500} height={500} />
            <div>
                <h1 className="font-bold text-5xl">{product.name}</h1>
                <PriceTag price={product.price} className="mt-4"  />
                <p className="my-6">{product.description}</p>
            <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
            </div>
        </div>
    )

}