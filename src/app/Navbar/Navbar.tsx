import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if(searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async function Navbar() {

    const cart = await getCart();
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-base-100">
            <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
                <div className="flex-1">
                    <Link href={'/'}>
                        <Image src={'/logo.png'} width={50} height={50} alt="logo" />
                    </Link>
                </div>
                <div className="flex-none gap-2">
                    <form action={searchProducts}>
                        <div className="form-control">
                            <input name="searchQuery" placeholder="Search" className="input input-bordered w-full min-w-[100px]" />
                        </div>
                    </form>
                    <ShoppingCartButton  cart={cart} />
                    <UserMenuButton session={session}  />
                </div>
            </div>
        </div>

    )
}