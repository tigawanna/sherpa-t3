import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumeRefrencesProps {
resume:ResumeFields
}

export function ResumeRefrences({resume}:ResumeRefrencesProps){
if(resume.references.length === 0) return null
return (
  <div className="flex h-full w-full flex-col">
    <h2 className="font-bold">References</h2>
      <div className="flex h-full w-full flex-wrap">
    {resume.references.map((item,idx) => {
      return (
        <div className="border p-1 px-2 rounded" key={item.name+idx}>
          <h3 className="font-bold ">{item.company}</h3>
          <div className="flex w-full gap-2">
            <h5>{item.name}</h5>
            <h5>{item.contact}</h5>
          </div>
  
        </div>
      );
    })}
    </div>
  </div>
);
}
