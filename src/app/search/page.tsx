import ProductCard from "@/components/ProductCard"
import { prisma } from "@/lib/db/prisma"
import { Prisma } from "@prisma/client"

interface searchPageProps{
    searchParams: { query: string }
}

const searchPage = async ({ searchParams: { query }}: searchPageProps) => {

    const products = await prisma.product.findMany({
        where: {
            OR: [
                {name: { contains: query, mode: 'insensitive'}},
                {description: { contains: query, mode: 'insensitive'}},
            ]
        },
        orderBy: {id: "desc"},
    })

    if(products.length === 0){
        return <div className="text-center">No Products with this query: {`${query}`} Found</div>
    }

    return (
        <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {products.map((product)=>(
                <ProductCard product={product} key={product.id}/>
            ))}
         </div>
    )
}

export default searchPage