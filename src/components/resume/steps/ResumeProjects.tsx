import { Plus, X } from "lucide-react";
import Link from "next/link";
import { api } from "~/utils/api";
import { ResumeFields } from "./ResumeMutiStepForm";
import { Project } from "@prisma/client";
import { TheListInput } from "~/components/form/inputs/ListInput";
import { useState } from "react";

interface ResumeProjectsProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export function ResumeProjects({user_id,input,setInput}:ResumeProjectsProps){

const query  = api.project.getAll.useQuery({
    user_id
});

const [projectLibs, setProjectLibs] = useState({
  languages: [],
  libraries: [],
});

  const isSelected = (id: string) => {
   return input.projects.some((val) => {
      return val.id === id;
    });
  };

  const handleAddItem = ({
    id,
    name,
   description,
   languages,
  libraries,
  }: Project) => {
    setInput((prev) => {
      if (
        prev.projects.some((val) => {
          return val.id === id;
        })
      ) {
        return prev;
      }
      return {
        ...prev,
        projects: [
          ...prev.projects,
          { id, name, description, languages, libraries },
        ],
      };
    });
  };
  const handleRemoveItem = ({ id }:Project) => {
    setInput((prev) => {
      const filtered = prev.projects.filter(
        (item) => item.id !==id
      );
      return { ...prev, projects: filtered };
    });
  };


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
          href={`/profile/${user_id}/project/new`}
          className=""
        >
          <Plus className="h-10 w-10 hover:text-accent" />
        </Link>
      </div>
    );
  }
  const projects = query.data;
return (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
{projects.map((item) => {
  return (
    <div
      key={item.id}
      className="sm:2-[45%] card  max-h-[400px] min-h-[100px] 
      w-[95%] border  bg-base-100 shadow-xl hover:border-accent md:w-[30%]"
    >
      <div className=" flex w-full items-center justify-end p-2">
        {isSelected(item.id) ? (
          <X
            className="h-6 w-6 text-error"
            onClick={() => handleRemoveItem(item)}
          />
        ) : (
          <Plus
            className="h-6 w-6 text-success"
            onClick={() => handleAddItem(item)}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-1 p-2">
        <h2 className="card-title">{item.name}</h2>
        <p className="line-clamp-1 text-sm">{item.description}</p>

        {/* <div className="flex w-full flex-wrap items-center justify-center gap-2 overflow-scroll">
          <TheListInput
            editing={true}
            field_key={"languages"}
            field_name="Languages."
            input={item}
            setInput={setProjectLibs}
          />
          <TheListInput
            editing={true}
            field_key={"libraries"}
            field_name="Libraries"
            input={item}
            setInput={setProjectLibs}
          />
        </div> */}
      </div>
    </div>
  );
})}
    </div>
  </div>
);
}
