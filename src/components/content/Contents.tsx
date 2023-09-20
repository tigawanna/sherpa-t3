import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface ContentsProps {

}

export function Contents({}:ContentsProps){
  const router = useRouter();
     const user_id = router.query.id as string;
     const query = api.content.getAll.useQuery({
         user_id
        });

     if (query.isLoading) {
       return (
         <div className="flex h-full  w-full items-center justify-center p-2">
           <span className="loading loading-infinity loading-lg text-warning"></span>
         </div>
       );
     }
     if (query.isError) {
       return (
         <div className="flex h-full  w-full items-center justify-center p-2">
           <div className="rounded-lg border p-2 text-error">
             {query.error.message}
           </div>
         </div>
       );
     }
     if (!query.data) {
       return (
         <div className="flex h-full  w-full items-center justify-center p-2">
         <div className="flex w-full items-center justify-center ">
            <Link href={`/profile/${user_id}/content/new`} className="btn btn-outline">
                <Plus className="h-6 w-6" />
            </Link>
         </div>
         </div>
       );
     }
const data = query.data;
return (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-5">

    <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
      <h3 className="text-2xl font-bold ">Content</h3>
      <Link
        href={`/profile/${user_id}/content/new`}
        className="btn btn-outline"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>

    <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
      {data &&
        data.map((item) => {
          return (
            <Link
              href={`/profile/${user_id}/content/${item.id}`}
              key={item.id}
              className="flex w-full flex-col justify-center gap-1 rounded-md border 
                p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
            >
              <Link href={item.content_url} className="">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <h3 className="text-lg">{item.type}</h3>
            </Link>
              <div className=" flex items-center justify-between text-sm">
                <h3>{item.createdAt.toISOString().split("T")[0]}</h3>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
);
}
