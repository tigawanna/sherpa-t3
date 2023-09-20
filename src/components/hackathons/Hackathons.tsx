import { Link2, Plus } from "lucide-react";
import  Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { HackathonCard } from "./HackathonCard";

interface HackathonsProps {

}

export function Hackathons({}:HackathonsProps){
     const user_id = useRouter().query.id as string;

     const query = api.hackathon.getAll.useQuery(
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
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-2 pb-5">
    <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
      <h3 className="text-2xl font-bold ">hackathons</h3>
      <Link
        href={`/profile/${user_id}/hackathon/new`}
        className="btn btn-outline"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
      {data &&
        data.map((item) => {
          return (
              <HackathonCard key={item.id} item={item}/>
          );
        })}
    </div>
  </div>
);
}
