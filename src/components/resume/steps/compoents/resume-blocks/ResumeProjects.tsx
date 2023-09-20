import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumeprojectsProps {
resume:ResumeFields
}

export function ResumeProjects({resume}:ResumeprojectsProps){
if(resume.projects.length === 0) return null;
const projects = resume.projects
return (
  <div className="flex h-full w-full flex-col gap-2">
    <h3 className="border-b font-bold">Projects</h3>
    <div className="flex h-full w-full flex-wrap items-center gap-2">
      {projects.map((item, idx) => {
        return (
          <div className="h-full  max-w-[45%] border p-2 gap-2" key={item.id}>
            <h3 className="font-bold">{item.name}</h3>
            <div className="flex gap-2">
           <p className="font-serif text-sm line-clamp-1">{item.description}</p>
            </div>

          </div>
        );
      })}
    </div>
  </div>
);
}
