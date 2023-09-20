import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface EducationsProps {

}

export function Educations({}:EducationsProps){
     const user_id = useRouter().query.id as string;
     const query = api.education.getAll.useQuery({
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
            <Link href={`/profile/${user_id}/education/new`} className="btn btn-outline">
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
      <h3 className="text-2xl font-bold ">Education</h3>
      <Link
        href={`/profile/${user_id}/education/new`}
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
              href={`/profile/${user_id}/education/${item.id}`}
              key={item.id}
              className="flex w-full flex-col justify-center gap-1 rounded-md border 
                p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
            >
              <h3 className="text-2xl font-bold">{item.school}</h3>
              <h3 className="text-lg">{item.field}</h3>
              <h3 className="">{item.qualification}</h3>
              <div className=" flex items-center justify-between text-sm">
                <h3>From : {item.from.toISOString().split("T")[0]}</h3>
                <h3>To : {item.to.toISOString().split("T")[0]}</h3>
              </div>
            </Link>
          );
        })}
    </div>
  </div>
);
}
