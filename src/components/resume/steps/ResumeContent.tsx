import { Plus, X } from "lucide-react";
import Link from "next/link";
import { api } from "~/utils/api";
import { ResumeFields } from "./ResumeMutiStepForm";
import { Content} from "@prisma/client";

interface ResumeContentProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export function ResumeContent({user_id,input,setInput}:ResumeContentProps){

const query  = api.content.getAll.useQuery({
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
  if (!query.data || (query.data && query.data.length === 0)) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
        <Link
          href={`/profile/${user_id}/content/new`}
          className=""
        >
          <Plus className="h-10 w-10 hover:text-accent" />
        </Link>
      </div>
    );
  }
const thons = query.data
const isSelected=(id:string)=>{
  return input.content.some((val) => {
    return val.id === id;
  });
}
const handleAddItem = ({ id,title,type }:Content) => {
  setInput((prev)=>{
    if (
      prev.content.some((val) => {
        return val.id === id;
      })
    ){
      return prev
    }
      return {
        ...prev,
        content: [
          ...prev.content,
          { id,title,type },
        ],
      };
  })
};
const handleRemoveItem = (id:string) => {
  setInput((prev)=>{
    const filtered = prev.content.filter(item=>item.id!==id)
    return { ...prev, content:filtered };
  })
};



return (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
    {thons.map((item)=>{
    return (
      <div
        key={item.id}
        className="flex w-full flex-col justify-center gap-1 rounded-md border 
          p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
      >
        <div className=" flex w-full items-center justify-end">
          {isSelected(item.id) ? (
            <X
              className="h-6 w-6 text-error"
              onClick={() => handleRemoveItem(item.id)}
            />
          ) : (
            <Plus
              className="h-6 w-6 text-success"
              onClick={() => handleAddItem(item)}
            />
          )}
        </div>
        <h3 className="text-2xl font-bold">{item.title}</h3>
        <h3 className="text-lg">{item.type}</h3>
      </div>
    );
    })}
    </div>
  </div>
);
}
