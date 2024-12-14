import Image from "next/image";
import banner from '@/assets/banner.jpg'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRightIcon} from "lucide-react";
import {Suspense} from "react";
import FeaturedProducts from "@/components/FeaturedProducts";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Home() {
  return (
      <main className='max-w-7xl mx-auto space-y-10 px-5 py-10'>
          <div className='flex items-center bg-secondary md:h-96'>
              <div className='space-y-7 p-10 text-center md:w-1/2'>
                  <h1 className='text-3xl md:text-4xl font-bold'>
                      Fill the void in your heart
                  </h1>
                  <p>
                      Tough day? Credit card maxed out? Buy some expensive stuff and
                      become happy again!
                  </p>
                  <Button asChild>
                      <Link href='/shop'>
                          Shop Now <ArrowRightIcon className='ml-5 size-5' />
                      </Link>
                  </Button>
              </div>
              <div className='relative hidden md:block w-1/2 h-full'>
                  <Image
                      src={banner}
                      alt='banner'
                      className='h-full w-full object-cover '
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent '/>
              </div>
          </div>
          <Suspense fallback={<LoadingSkeleton />}>
              <FeaturedProducts />
          </Suspense>
      </main>
  );
}
