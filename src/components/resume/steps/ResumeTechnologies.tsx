import { Plus } from "lucide-react";
import Link from "next/link";
import { TheListInput } from "~/components/form/inputs/ListInput";
import { api } from "~/utils/api";
import { ResumeFields } from "./ResumeMutiStepForm";
import { useEffect } from "react";

interface ResumeTechnologiesProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export function ResumeTechnologies({user_id,input,setInput}:ResumeTechnologiesProps){

const query  = api.project.getAll.useQuery({
    user_id
});

useEffect(()=>{
  if(query.data){
    const packagesAndLanguages = query.data.reduce(
      (
        acc: {
          languages: string[];
          libraries: string[];
        },
        item
      ) => {
        acc.languages.push(...item.languages);
        acc.libraries.push(...item.libraries);
        return acc;
      },
      { languages: [], libraries: [] }
    );
    setInput((prev)=>{
      return {
        ...prev,
        languages: packagesAndLanguages.languages,
        libraries: packagesAndLanguages.libraries,
      }
    })
  }
},[query.data]);

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
      <TheListInput
        editing={true}
        field_key={"languages"}
        field_name="Languages"
        input={input}
        setInput={setInput}
      />
      <TheListInput
        editing={true}
        field_key={"libraries"}
        field_name="Libraries"
        input={input}
        setInput={setInput}
      />
    </div>
  </div>
);
}
