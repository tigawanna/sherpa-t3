import { JobApplication } from "~/server/api/routers/jobs-application";
import { useFormHook } from "../form/useForm";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { JobBasicInfoForm } from "./JobBasicInfoForm";
import { ResumeMultiStepForm } from "../resume/steps/ResumeMutiStepForm";


interface JobApplicationFormProps {
  default_value?: JobApplication;
  updating?: boolean;
}

export function JobApplicationForm({
  default_value,
  updating=false,
}: JobApplicationFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;

  const query = api.profile.getOne.useQuery({
    id: user_id,
  });

  const create_mutation = api.jobsAppliedTo.addNew.useMutation();
  const update_mutation = api.jobsAppliedTo.updateOne.useMutation();

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<JobApplication>({
      initialValues: {
        id: default_value?.id,
        userProfileId: default_value?.userProfileId ?? user_id,
        resumeId: default_value?.resumeId ?? null,
        job_title: default_value?.job_title ?? "",
        description: default_value?.description ?? "",
        job_posting_url: default_value?.job_posting_url ?? "",
        cover_letter: default_value?.cover_letter ?? "",
        resume: default_value?.resume ?? "",
        projects: default_value?.projects ?? [],
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
          .then(() => toast("Applied to Job successfully", { type: "success" }))
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      } else {
        create_mutation
          .mutateAsync(input)
          .then(() => toast("Applied to Job successfully", { type: "success" }))
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
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        <div className="rounded-lg border text-error">No matches found</div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-full w-full  flex-col items-center justify-center p-5 md:w-[60%]">
        <JobBasicInfoForm
          editing={editing}
          input={input}
          updating={updating}
          isLoading={create_mutation.isLoading || update_mutation.isLoading}
          setInput={setInput}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
        <div className="h-full w-full  flex-col items-center justify-center p-5 ">
         <ResumeMultiStepForm/>
        </div>
    </div>
  );
}
