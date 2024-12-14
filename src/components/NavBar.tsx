import Link from "next/link";
import Image from "next/image";

import {getCart} from "@/lib/action/product.action";
import logo from '@/assets/logo.png'

export default async function NavBar() {
    const cart = await getCart();

    const totalQuantity
        = cart?.lineItems.reduce(
            (acc, item) => acc + (item.quantity || 0),
        0) || 0;

    return (
        <header className='bg-background shadow-sm'>
            <nav className='max-w-7xl mx-auto p-5 flex justify-between gap-5'>
                <Link href="/" className='flex items-center gap-4'>
                    <Image
                        src={logo}
                        alt='flowhop logo'
                        width={40}
                        height={40}
                    />
                    <span className='text-xl font-bold'>Flow Shop</span>
                </Link>
                <div><span>{totalQuantity}</span> item in your cart</div>
            </nav>
        </header>
    )
}