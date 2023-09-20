import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import { useFormHook } from "~/components/form/useForm";
import { TheTextInput } from "~/components/form/inputs/TheTextInput";
import { Content } from "~/server/api/routers/content";


interface ContentFormProps {
  default_value?: Content;
  updating?: boolean;
}

export function ContentForm({
  default_value,
  updating,
}: ContentFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;

  const create_mutation = api.content.addNew.useMutation();
  const update_mutation = api.content.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<Content>({
      initialValues: {
        id: default_value?.id,
        userProfileId: default_value?.userProfileId ?? user_id,
        content_url: default_value?.content_url??"",
        title: default_value?.title??"",
        type: default_value?.type??"Blog",
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
            router.push(`/profile/${user_id}/content/${res.id}`);
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
        <TheTextInput<Content>
          field_key={"title"}
          value={input["title"]}
          // input={input}
          field_name={"Title"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Content>
          field_key={"content_url"}
          value={input["content_url"]}
          // input={input}
          type="url"
          field_name={"Content Url"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        {/* "Video" | "Blog" | "Gist" | "Podcast" */}
        <div className="w-full">
          <select
            defaultValue={input["type"]}
            onChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  qualification: e.target.value as Content["type"],
                };
              });
            }}
            className="select select-accent select-sm w-full max-w-xs"
          >
            <option value={"Video"}>Video</option>
            <option value={"Blog"}>Blog</option>
            <option value={"Gist"}>Gist</option>
            <option value={"Podcast"}>Podcast</option>
          </select>
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
