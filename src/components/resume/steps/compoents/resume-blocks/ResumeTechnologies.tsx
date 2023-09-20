import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumeTechnologiesProps {
  resume: ResumeFields;
}

export function ResumeTechnologies({resume}:ResumeTechnologiesProps){
if (resume.languages.length === 0 && resume.libraries.length === 0) return null;
return (
  <div className="flex h-full w-full items-center gap-2">


    {resume.libraries.length > 0 && (
      <div className="flex h-full w-full flex-col justify-center">
        <h3 className="border-b font-bold">Libraries</h3>
        <div className="prose-sm flex h-full w-full flex-wrap items-center gap-2">
          {resume.libraries.map((item,idx) => {
            return (
              <li className="min-w-[80px]" key={item+idx}>
                {item}
              </li>
            );
          })}
        </div>
      </div>
    )}
  </div>
);
}
