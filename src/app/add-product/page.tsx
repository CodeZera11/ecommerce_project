import FormSubmitButton from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Add Product - Ecommerce'
}

async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = formData.get("price")?.toString();

    if(!name || !description || !imageUrl || !price){
        throw Error("Missing requied feilds");
    }

    await prisma.product.create({
        data: { name, description, imageUrl, price },
    });

    redirect("/");
}

const page = () => {
  return (
    <div>
        <h1 className='text-lg mb-3 font-bold'>Add Product</h1>
        <form action={addProduct}>
            <input type="text" required name='name' placeholder='Name' className="input mb-3 input-bordered w-full" />
            <textarea required name='description' placeholder='Description' className='textarea textarea-bordered w-full mb-3'  />
            <input type="url" required name='imageUrl' placeholder='Image URL' className="input mb-3 input-bordered w-full " />
            <input type="number" required name='price' placeholder='Price' className="input mb-3 input-bordered w-full" />
            <FormSubmitButton className='btn-block'>Add Product</FormSubmitButton>
        </form>
    </div>
  )
}

export default page