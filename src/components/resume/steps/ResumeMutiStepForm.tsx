import { useRouter } from "next/router";
import { useMultiStepForm } from "~/state/hooks/useMultiStepForm";
import { ResumeProjects } from "./ResumeProjects";
import { useFormHook } from "~/components/form/useForm";
import { ResumeHackathons } from "./ResumeHackathons";
import { ResumeEducation } from "./ResumeEducation";
import { ResumeExperience } from "./ResumeExperience";
import { ResumeReference } from "./ResumeReference";
import { ResumeBasicDetails } from "./ResumeBasicDetails";
import { FinalResume } from "./FinalResume";
import { ResumeTechnologies } from "./ResumeTechnologies";


interface MultiStepResumeFormProps {

}

export interface ResumeFields {
  name: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  github_username: string;
  country: string;
  city: string;
  skills: string[];
  languages: string[];
  libraries: string[];
  projects: {
    id: string;
    name: string;
    description: string;
    languages: string[];
    libraries: string[];
  }[];
  education: {
    id: string;
    field: string;
    from: Date;
    to: Date;
    qualification: string;
    school: string;
  }[];
  hackathons: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
  }[];
  content: {
    id: string;
    title: string;
    type: string;
  }[];
  experience: {
    id: string;
    position: string;
    company: string;
    from: Date;
    to: Date;
  }[];
  references: {
    name: string;
    company: string;
    contact: string;
  }[];
}



export function ResumeMultiStepForm({}: MultiStepResumeFormProps) {
  const router = useRouter();
  const user_id = router.query.id as string;



    const { handleChange, input, setError, setInput, validateInputs } =
      useFormHook<ResumeFields>({
        initialValues: {
          name: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          summary: "",
          website: "",
          github_username: "",
          projects: [],
          skills: [],
          languages: [],
          libraries: [],
          hackathons: [],
          content: [],
          references: [],
          education: [],
          experience:[]
        },
      });
          // const query = api.profile.getOne.useQuery({
          //   id: router.query.id as string,
          // });

          // useEffect(() => {
          //   console.log("query.dat == ", query.data);
          //   // if (query.data) {
          //   setInput((prev) => {
          //     return {
          //       ...prev,
          //       name: query.data?.name ?? "",
          //       email: query.data?.email ?? "",
          //       phone: query.data?.phone ?? "",
          //       github_username: query.data?.github_username ?? "",
          //       summary: query.data?.about_me ?? "",
          //       skills: query.data?.skills ?? [],
          //     };
          //   });
          //   // }
          // }, [query.data]);

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultiStepForm([
    {
      title: "Basics",
      component: (
        <ResumeBasicDetails
          user_id={user_id}
          input={input}
          setInput={setInput}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Projects",
      component: (
        <ResumeProjects
          user_id={user_id}
          input={input}
          setInput={setInput}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Technologies",
      component: (
        <ResumeTechnologies
          user_id={user_id}
          input={input}
          setInput={setInput}
          handleChange={handleChange}
        />
      ),
    },

    {
      title: "Education",
      component: (
        <ResumeEducation
          user_id={user_id}
          input={input}
          setInput={setInput}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Experience",
      component: (
        <ResumeExperience
          user_id={user_id}
          input={input}
          setInput={setInput}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "Hackathons",
      component: (
        <ResumeHackathons
          user_id={user_id}
          input={input}
          setInput={setInput}
          handleChange={handleChange}
        />
      ),
    },
    {
      title: "References",
      component: (
        <ResumeReference
          user_id={user_id}
          input={input}
          setInput={setInput}

        />
      ),
    },
    {
      title: "Finally",
      component: (
        <FinalResume
          user_id={user_id}
          input={input}
          setInput={setInput}

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

  console.log("inpu == ", input); 
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-bold">Create Resume </h1>
      <div className="flex w-[90%] flex-wrap items-center gap-3 lg:w-[70%]">
        {steps.map((item, index) => {
          const base_style = "btn btn-sm btn-outline";
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
          );
        })}
      </div>

      <form
        onSubmit={onSubmit}
        className="card card-bordered w-[90%] p-5 lg:w-[70%] min-h-[70vh] flex flex-col items-stretch justify-between"
      >
        <div className="absolute right-[4%] top-[4%]">
          {currentStepIndex + 1} / {steps.length}
        </div>
        <h2 className="text-xl font-bold">{step?.title}</h2>
        {step?.component}
        <div className="mt-4 flex justify-end gap-2 ">
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
