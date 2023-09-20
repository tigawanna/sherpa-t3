import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import { useFormHook } from "~/components/form/useForm";
import { TheTextInput } from "~/components/form/inputs/TheTextInput";
import { Education } from "~/server/api/routers/education";


interface EducationFormProps {
  default_value?: Education;
  updating?: boolean;
}

export function EducationForm({
  default_value,
  updating,
}: EducationFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;

  const create_mutation = api.education.addNew.useMutation();
  const update_mutation = api.education.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<Education>({
      initialValues: {
        id: default_value?.id,
        school: default_value?.school ?? "",
        field: default_value?.field ?? "",
        from: default_value?.from ?? new Date(),
        userProfileId: default_value?.userProfileId ?? user_id,
        to: default_value?.to ?? new Date(),
        qualification: default_value?.qualification ?? "Certificate",
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
            router.push(`/profile/${user_id}/education/${res.id}`);
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
        <TheTextInput<Education>
          field_key={"school"}
          value={input["school"]}
          // input={input}
          field_name={"institution"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Education>
          field_key={"field"}
          value={input["field"]}
          // input={input}
          field_name={"Field of study"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        {/* "Certificate" | "Bachelors" | "Masters" | "PhD" | */}
        <div className="w-full">
          <select
            defaultValue={input["qualification"]}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  qualification: e.target.value as Education["qualification"],
                };
              });
            }}
            className="select select-accent select-sm w-full max-w-xs"
          >
            <option value={"Certificate"}>Certificate</option>
            <option value={"Diploma"}>Diploma</option>
            <option value={"Masters"}>Masters</option>
            <option value={"PhD"}>PhD</option>
          </select>
        </div>

        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<Education>
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
          <TheTextInput<Education>
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
