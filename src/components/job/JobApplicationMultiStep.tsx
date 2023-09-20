import { useState } from "react";
import { JobApplication } from "~/server/api/routers/jobs-application";
import { useFormHook } from "../form/useForm";
import { useRouter } from "next/router";
import { useMultiStepForm } from "~/state/hooks/useMultiStepForm";

import { api } from "~/utils/api";
import { JobApplicationProjects } from "./JobApplicationProjects";

interface JobApplicationMultiStepProps {
  default_value?: JobApplication;
  updating?: boolean;
}

export function JobApplicationMultiStep({
  default_value,
  updating,
}: JobApplicationMultiStepProps) {
  const router = useRouter();
  const user_id = router.query.id as string;

  const query = api.profile.getOne.useQuery({
    id: user_id,
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<JobApplication>({
      initialValues: {
        id: default_value?.id,
        userProfileId: default_value?.userProfileId ?? user_id,
        job_title: default_value?.job_title ?? "",
        description: default_value?.description ?? "",
        job_posting_url: default_value?.job_posting_url ?? "",
        projects: default_value?.projects ?? [],
        cover_letter: default_value?.cover_letter ?? "",
        resume: default_value?.resume ?? "",
        resumeId: default_value?.resumeId??null,
      },
    });

  const [editing, setEditing] = useState(!updating);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next,goTo } =
    useMultiStepForm([
      {
        title: "Job Description",
        component: (
      <div>JOB DESCRIPTION</div>
        ),
      },

      {
        title: "Resume Projects",
        component: (
          <JobApplicationProjects
            input={input}
            setInput={setInput}
            editing={editing}
            handleChange={handleChange}
            user_profile={query.data!}
          />
        ),
      },
      {
        title: "Resume Hackathons",
        component: (
          <JobApplicationProjects
            input={input}
            setInput={setInput}
            editing={editing}
            handleChange={handleChange}
            user_profile={query.data!}
          />
        ),
      },
      // <StepTwo<typeof input> input={input} setInput={setInput} />,
    ]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
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
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
      <div className="flex flex-wrap w-[90%] items-center lg:w-[70%] gap-3">
        {steps.map((item, index) => {
          const base_style="btn btn-sm btn-outline";
          return (
            <button
            key={index}
              className={
                index === currentStepIndex
                  ? base_style + "border-accent text-accent"
                  : base_style
              }
              onClick={() => goTo(index)}
            >
              {item?.title}
            </button>
          );})}
      </div>

      <form
        onSubmit={onSubmit}
        className="card card-bordered w-[90%] p-5 lg:w-[70%]"
      >
        <div className="absolute right-[4%] top-[4%]">
          {currentStepIndex + 1} / {steps.length}
        </div>
        <h2 className="text-xl font-bold">{step?.title}</h2>
        {step?.component}
        <div className="mt-4 flex justify-end gap-2">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="btn btn-outline btn-sm text-sm"
            >
              Back
            </button>
          )}
          <button type="submit" className="btn btn-outline btn-sm text-sm">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
