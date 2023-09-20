import { JobApplication } from "~/server/api/routers/jobs-application";
import { TheTextAreaInput } from "../form/inputs/TheTextArea";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { Loader } from "lucide-react";

interface JobBasicInfoFormProps {
  input:JobApplication;
  updating:boolean
  editing:boolean;
  isLoading:boolean
  setInput: React.Dispatch<React.SetStateAction<JobApplication>>;
  handleSubmit: (e:React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function JobBasicInfoForm({input,setInput,handleSubmit,handleChange,editing,isLoading,updating}:JobBasicInfoFormProps){
return (
  <form
    onSubmit={handleSubmit}
    className="flex h-full w-full flex-col items-center justify-center gap-3 "
  >
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <TheTextInput<JobApplication>
        field_key={"job_title"}
        value={input["job_title"]}
        // input={input}
        field_name={"Job Title"}
        className="input input-bordered input-sm w-full  "
        label_classname="text-base capitalize"
        onChange={handleChange}
        editing={editing}
      />
      <TheTextInput<JobApplication>
        field_key={"job_posting_url"}
        value={input["job_posting_url"] ?? ""}
        // input={input}
        field_name={"Job posting Url"}
        type="url"
        className="input input-bordered input-sm w-full  "
        label_classname="text-base capitalize"
        onChange={handleChange}
        editing={editing}
      />
      <TheTextAreaInput<JobApplication>
        field_key={"description"}
        value={input["description"] ?? ""}
        // input={input}
        field_name={"Job Description"}
        className="min-h-[10px]"
        description="copy-paste in your job description"
        label_classname="text-base capitalize"
        onChange={handleChange}
        editing={editing}
      />
    </div>
    {editing && (
      <div className="flex w-full items-center justify-center">
        <button className="btn btn-sm  mt-2 w-[80%] text-accent sm:w-[70%] md:w-[40%]">
          {isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <div></div>
          )}
          {updating ? "Update" : "Create"}
        </button>
      </div>
    )}
  </form>
);
}
