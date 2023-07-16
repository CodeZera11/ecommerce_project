import { Product } from "@prisma/client"
import Image from "next/image"
import PriceTag from "./PriceTag"

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    
    const isNew = Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 * 60 * 24 * 7

  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-xl mt-3">
            <figure><Image width={800} height={400} className="h-48 object-cover" src={`${product.imageUrl}`} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                {isNew && <div className="badge badge-primary">NEW</div>}
               
                <p>{product.description}</p>
                <PriceTag price={product.price}  />
            </div>
        </div>
    </div>
  )
}

export default ProductCard