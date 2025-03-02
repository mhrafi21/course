import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (

     <div className="flex items-center space-x-4 min-h-[135px]">
        
      <div className="space-y-2 w-full px-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-full" />
      </div>

   </div>
  )
}
