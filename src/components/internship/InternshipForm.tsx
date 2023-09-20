import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import {  Edit, Loader  } from "lucide-react";
import { useFormHook } from "~/components/form/useForm";
import { Internship } from "~/server/api/routers/internship";
import { TheTextAreaInput } from "~/components/form/inputs/TheTextArea";
import { TheTextInput } from "~/components/form/inputs/TheTextInput";


interface InternshipFormProps {
  default_value?:Internship;
  updating?: boolean;
}

export function InternshipForm({ default_value, updating }: InternshipFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;
  

const create_mutation = api.internship.addNew.useMutation();
  const update_mutation = api.internship.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<Internship>({
      initialValues: {
        id: default_value?.id,
        company: default_value?.company??"",
        role: default_value?.role??"",
        description: default_value?.description??"",
        from: default_value?.from??new Date(),
        userProfileId:default_value?.userProfileId ?? user_id,
        to: default_value?.to??new Date(),
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
          .then((res) => {
            toast("Project added successfully", { type: "success" })
        })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      } else {
        create_mutation
          .mutateAsync(input)
          .then((res) =>{
            toast("Project added successfully", { type: "success" })
            router.push(`/profile/${user_id}/internship/${res.id}`);
            })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      }
    }
  }
    const dateToString = (date: Date | string) => {
      if (date instanceof Date) {
        return date.toISOString().slice(0, 10);
      }
      return date;
    };




  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
      <div className="flex w-full justify-end px-5">
        <Edit
          className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center gap-2"
      >
        <TheTextInput<Internship>
          field_key={"company"}
          value={input["company"]}
          // input={input}
          field_name={"Company"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Internship>
          field_key={"role"}
          value={input["role"]}
          // input={input}
          field_name={"Role"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<Internship>
          field_key={"description"}
          value={input["description"]}
          // input={input}
          field_name={"Description"}
          className="min-h-[150px]"
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<Internship>
            field_key={"from"}
            value={dateToString(input["from"])}
            type="date"
            // input={input}
            field_name={"From"}
            className="input input-bordered input-sm w-full  "
            label_classname="text-base capitalize"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput((prev) => {
                return { ...prev, from: new Date(e.target.value) };
              });
            }}
            editing={editing}
          />
          <TheTextInput<Internship>
            field_key={"to"}
            value={dateToString(input["to"])}
            type="date"
            // input={input}
            field_name={"To"}
            className="input input-bordered input-sm w-full  "
            label_classname="text-base capitalize"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput((prev) => {
                return { ...prev, to: new Date(e.target.value) };
              });
            }}
            editing={editing}
          />
        </div>
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
      </form>
    </div>
  );
}
