import {  ProjectInputType } from "~/server/api/routers/project";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { useFormHook } from "../form/useForm";
import { api } from "~/utils/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { TheTextAreaInput } from "../form/inputs/TheTextArea";
import { Edit, Loader } from "lucide-react";
import { TheListInput } from "../form/inputs/ListInput";
import { ThePicUrlInput } from "../form/ThePicUrlInput";
import { useRouter } from "next/router";

interface ProjectFormProps {
    user:string
    project?:ProjectInputType
    updating?:boolean
}

export function ProjectForm({user,project,updating}: ProjectFormProps) {

const router = useRouter()  
const create_mutation = api.project.addNew.useMutation();
const update_mutation = api.project.updateOne.useMutation();
// const query = api.profile.getOne.useQuery({ id: router.query.id as string });
function getId(){
  if(updating && project?.id && project?.id.length > 5){
    return project.id
  }
}
const { handleChange, input, setError, setInput, validateInputs } =
  useFormHook<ProjectInputType>({
    initialValues: {
        id:getId(),
        name:project?.name??"",
        description:project?.description??"",
        libraries:project?.libraries??[],
        languages:project?.languages??[],
        repoUrl:project?.repoUrl??"",
        image_url:project?.image_url??"",
        userProfileId:project?.userProfileId??user,
    },
  });


const [editing, setEditing] = useState(!updating);
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  e.stopPropagation();

  if (editing) {
    if (updating) {
      update_mutation
        .mutateAsync(input)
        .then(() => toast("Project added successfully", { type: "success" }))
        .catch((error) =>
          toast(error.message, { type: "error", autoClose: false })
        );
    } else {
      create_mutation
        .mutateAsync(input)
        .then((res) => {
          toast("Project added successfully", { type: "success" })
          router.push(`/profile/${user}/project/${res.id}`)
        })
        .catch((error) =>
          toast(error.message, { type: "error", autoClose: false })
        );
    }
  }
}
const modal_id = "add_project_from_github";
  return (
    <div className="flex h-full w-full  flex-col items-center justify-center ">
      <div className="flex w-full justify-end px-5">
        <Edit
          className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center gap-3"
      >
        <h1 className="text-2xl font-bold">
          {updating ? "Project" : "Add Project"}
        </h1>

        <TheTextInput<ProjectInputType>
          field_key={"name"}
          field_name={"Name"}
          value={input["name"]}
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<ProjectInputType>
          field_name={"Description"}
          field_key="description"
          value={input["description"]}
          onChange={handleChange}
          editing={editing}
        />

        <TheTextInput<ProjectInputType>
          field_key={"repoUrl"}
          field_name={"Github Url"}
          value={input["repoUrl"]}
          type="url"
          onChange={handleChange}
          editing={editing}
        />

        {/* image */}
        <ThePicUrlInput
          img_url={input.image_url??""}
          
          className=""
          editing={editing}
          setInputImage={(url) =>
            setInput((prev) => {
              return {
                ...prev,
                image_url: url ?? "",
              };
            })
          }
        />
        <TheTextInput<ProjectInputType>
          field_key={"image_url"}
          field_name={"Image Url"}
          value={input["image_url"]}
          type="url"
          onChange={handleChange}
          editing={editing}
        />

        <div className=" flex w-full flex-wrap items-center justify-center gap-5 lg:flex-row">
          <TheListInput
            editing={editing}
            field_name="Languages"
            field_key="languages"
            input={input}
            setInput={setInput}
          />

          <TheListInput
            editing={editing}
            field_name="Libraries"
            field_key="libraries"
            input={input}
            setInput={setInput}
          />
        </div>

        {editing && (
          <div className="flex w-full items-center justify-center">
            <button className="btn btn-sm  mt-2 w-[80%] text-accent sm:w-[70%] md:w-[40%]">
              {create_mutation.isLoading || update_mutation.isLoading ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                <div></div>
              )}
              {updating ? "Update" : "Create"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
