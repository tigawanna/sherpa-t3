import { SkillInputType } from "~/server/api/routers/project";
import { api } from "~/utils/api";
import { useFormHook } from "../form/useForm";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { TheTextAreaInput } from "../form/inputs/TheTextArea";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

interface SkillsFormProps {
defaultValues?: Partial<SkillInputType>
editing?: boolean
updating?: boolean
}

export function SkillsForm({defaultValues,editing,updating}:SkillsFormProps){
    const create_mutation = api.skill.addNew.useMutation();
    const update_mutation = api.skill.updateOne.useMutation();

    const { handleChange, input, setError, setInput, validateInputs } =
      useFormHook<SkillInputType>({
        initialValues: {
          userProfileId: defaultValues?.userProfileId ?? "",
          description: defaultValues?.description ?? "",
          name: defaultValues?.name ?? "",
          url: defaultValues?.url ?? "",
        },
      });
      
      function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();

        if (editing) {
          if (updating) {
            update_mutation
              .mutateAsync(input)
              .then(() =>
                toast("Skill created successfully", { type: "success" })
              )
              .catch((error) =>
                toast(error.message, { type: "error", autoClose: false })
              );
          } else {
            create_mutation
              .mutateAsync(input)
              .then(() =>
                toast("Skill created successfully", { type: "success" })
              )
              .catch((error) =>
                toast(error.message, { type: "error", autoClose: false })
              );
          }
        }
      }
return (
  <div className="flex h-full w-full md:w-[60%] flex-col items-center justify-center">
    <TheTextInput onChange={handleChange} field_name={"name"} input={input} />
    <TheTextAreaInput
      onChange={handleChange}
      field_name={"description"}
      input={input}
    />
    <TheTextInput
      onChange={handleChange}
      field_name={"url"}
      input={input}
      type="url"
    />

    {editing && (
      <div className="flex w-full items-center justify-center">
        <button className="btn btn-sm  mt-2 w-[80%] sm:w-[70%] md:w-[40%] ">
          {create_mutation.isLoading || update_mutation.isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <div></div>
          )}
          {updating ? "Update" : "Create"}
        </button>
      </div>
    )}
  </div>
);
}
