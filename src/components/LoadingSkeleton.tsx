import {Skeleton} from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
    return(
        <main>
            <div className='flex flex-row gap-2 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {Array.from(Array(10).keys()).map((_, i) => (
                    <Skeleton key={i} className='h-[23rem] w-full' />
                ))}
            </div>
        </main>
    )
}