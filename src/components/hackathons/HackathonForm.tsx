import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import {  Edit, Loader  } from "lucide-react";
import { useFormHook } from "~/components/form/useForm";
import { TheTextAreaInput } from "~/components/form/inputs/TheTextArea";
import { TheTextInput } from "~/components/form/inputs/TheTextInput";
import { Hackathon } from "~/server/api/routers/hackathon";
import { TheListInput } from "../form/inputs/ListInput";



interface HackathonFormProps {
  default_value?:Hackathon;
  updating?: boolean;
}

export function HackathonForm({ default_value, updating }: HackathonFormProps) {
  const router = useRouter();

  

const create_mutation = api.hackathon.addNew.useMutation();
  const update_mutation = api.hackathon.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<Hackathon>({
      initialValues: {
        id: default_value?.id,
        name: default_value?.name??"",
        description: default_value?.description??"",
        link: default_value?.link??"",
        technologies: default_value?.technologies??[],
        from: default_value?.from??new Date(),
        to: default_value?.to??new Date(),
        userProfileId:default_value?.userProfileId ?? router.query.id as string
    },
    });


  const [editing, setEditing] = useState(!updating);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    // setInput((prev) => ({ ...prev, userProfileId:router.query.id as string }));
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
            router.push(`/profile/${router.query.id}/hackathon/${res.id}`);
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
        <h3 className="w-full text-accent border-b text-center">{input.userProfileId}</h3>
        <TheTextInput<Hackathon>
          field_key={"name"}
          value={input["name"]}
          // input={input}
          field_name={"Hackathon name"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<Hackathon>
          field_key={"description"}
          value={input["description"]}
          // input={input}
          field_name={"Brief description"}
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Hackathon>
          field_key={"link"}
          value={input["link"]}
          // input={input}
          field_name={"Link to Project"}
          type="url"
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />

        <TheListInput
          editing={editing}
          field_name="Technologies"
          field_key="technologies"
          input={input}
          setInput={setInput}
        />

        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<Hackathon>
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
          <TheTextInput<Hackathon>
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
