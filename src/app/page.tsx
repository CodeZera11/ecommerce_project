import ProductCard from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import PaginationBar from '@/components/PaginationBar';

interface HomeProps {
  searchParams: { page: string }
}

export default async function Home({searchParams: {page="1"}}: HomeProps) {

  const session = await getServerSession(authOptions);

  if(!session){
    redirect("/api/auth/signin")
  }

  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount)/pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  

  return (
    <div className='flex flex-col items-center'>
      { currentPage === 1 && <div className="hero rounded-xl bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Link href={'/product/'+products[0].id}>
          <Image src={`${products[0].imageUrl}`} alt='hero image' width={400} height={800} className="max-w-sm rounded-lg shadow-2xl w-full" priority />
        </Link>
        <div>
          <h1 className="text-5xl font-bold">{products[0].name}</h1>
          <p className="py-6">{products[0].description}</p>
          <Link href={'/product/' + products[0].id} className='btn btn-primary'>Check this out</Link>
        </div>
      </div>
    </div>}

    <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {(currentPage === 1 ? products.slice(1) : products).map((product)=>(
        
        <ProductCard product={product} key={product.id}/>
      
      ))}
    </div>

        {totalPages > 1 && (
            <PaginationBar currentPage={currentPage} totalPages={totalPages}  />
        )}

    </div>
  )
}
