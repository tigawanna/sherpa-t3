import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import { useFormHook } from "~/components/form/useForm";
import { TheTextInput } from "~/components/form/inputs/TheTextInput";
import { Experience } from "~/server/api/routers/experience";
import { TheTextAreaInput } from "../form/inputs/TheTextArea";

interface ExperienceFormProps {
  default_value?: Experience;
  updating?: boolean;
}

export function ExperienceForm({
  default_value,
  updating,
}: ExperienceFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;

  const create_mutation = api.experience.addNew.useMutation();
  const update_mutation = api.experience.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<Experience>({
      initialValues: {
        id: default_value?.id,
        company: default_value?.company ?? "",
        description: default_value?.description ?? "",
        position: default_value?.position ?? "",
        from: default_value?.from ?? new Date(),
        userProfileId: default_value?.userProfileId ?? user_id,
        to: default_value?.to ?? new Date(),
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
            toast("Project added successfully", { type: "success" });
          })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      } else {
        create_mutation
          .mutateAsync(input)
          .then((res) => {
            toast("Project added successfully", { type: "success" });
            router.push(`/profile/${user_id}/experience/${res.id}`);
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
        <TheTextInput<Experience>
          field_key={"company"}
          value={input["company"]}
          // input={input}
          field_name={"Company"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Experience>
          field_key={"position"}
          value={input["position"]}
          // input={input}
          field_name={"Job Position"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<Experience>
          field_key={"description"}
          value={input["description"]??""}
          // input={input}
          field_name={"Job Description"}
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />

        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<Experience>
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
          <TheTextInput<Experience>
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
