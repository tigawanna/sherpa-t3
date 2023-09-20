import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Resume } from "src/server/api/routers/resume";
import { useFormHook } from "~/components/form/useForm";
import Link from "next/link";
import { JobApplication } from "~/server/api/routers/jobs-application";



interface ResumeFormProps {
  job: JobApplication;
  default_value?: Resume;
  updating?: boolean;
}

export function ResumeForm({
  default_value,
  job,
  updating,
}: ResumeFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;

  const query = api.profile.getOne.useQuery({
    id: user_id,
  });

  const create_mutation = api.resume.addNew.useMutation();
  const update_mutation = api.resume.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<Resume>({
    initialValues: {
        id: default_value?.id,
        userProfileId: default_value?.userProfileId ?? user_id,
        body: default_value?.body ?? "",
        jobAplicationId: default_value?.id ?? job.id as string,
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
          .then(() => toast("Project added successfully", { type: "success" }))
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      }
    }
  }
  if (query.isLoading) {
    return (
      <div className="flex min-h-[20%]  w-full items-center justify-center">
        <span className="loading loading-infinity loading-lg text-warning"></span>
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        <div className="rounded-lg border text-error">
          {query.error.message}
        </div>
      </div>
    );
  }
  if (!query.data) {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center gap-5">
        <div className="rounded-lg border text-info">No matches found</div>
        <Link
          href={`/profile/${user_id}`}
          className="btn btn-outline text-accent"
        >
          Go Back
        </Link>
      </div>
    );
  }
  const user_profile = query.data;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2"></div>
    </div>
  );
}
