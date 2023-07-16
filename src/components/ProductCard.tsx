import { Product } from "@prisma/client"
import Image from "next/image"
import PriceTag from "./PriceTag"
import Link from "next/link"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 60 * 24 * 7

  return (
        <Link href={'/product/'+product.id} className="card w-full   bg-base-100 hover:shadow-2xl transition-shadow">
            <figure><Image width={800} height={400} className="h-48 object-cover" src={`${product.imageUrl}`} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                {isNew && <div className="badge badge-primary">NEW</div>}
               
                <p>{product.description}</p>
                <PriceTag price={product.price}  />
        </div>
        </Link>
    
  )
}

export default ProductCard