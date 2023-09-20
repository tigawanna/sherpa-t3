import { Plus } from "lucide-react";
import  Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface InternshipsProps {

}

export function Internships({}:InternshipsProps){
     const user_id = useRouter().query.id as string;

     const query = api.internship.getAll.useQuery(
       {
         user_id: user_id,
       }
     );

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
           <div className="rounded-lg border p-2 text-info">
             no matches found
           </div>
         </div>
       );
     }
     const data = query.data;
return (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 ">
    <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
      <h3 className="text-2xl font-bold ">Internships</h3>
      <Link
        href={`/profile/${user_id}/experience/new`}
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
              href={`/profile/${user_id}/internship/${item.id}`}
              key={item.id}
              className="flex w-full flex-col justify-center gap-1 rounded-md border 
                p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
            >
              <h3 className="text-2xl font-bold">{item.company}</h3>
              <h3 className="">{item.role}</h3>
              <div className=" flex items-center justify-between text-sm">
                <h3>From : {item.from.toISOString().split("T")[0]}</h3>
                <h3>To : {item.to.toISOString().split("T")[0]}</h3>
              </div>
              <p className="line-clamp-1">{item.description}</p>
            </Link>
          );
        })}
    </div>
  </div>
);
}
