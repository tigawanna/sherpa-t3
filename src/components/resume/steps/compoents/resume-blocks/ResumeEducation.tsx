import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumeEducationProps {
  resume: ResumeFields;
}

export function ResumeEducation({resume}:ResumeEducationProps){
if(resume.education.length === 0) return null
return (
 <div className='w-full h-full flex flex-col items-center justify-center gap-1 '>
    <h2 className="font-bold  w-full">Education</h2>
    {resume.education.map((item)=>{
      return (
        <div className="w-full border p-1" key={item.id}>
            <h3 className="font-bold">
             {item.school}   
            </h3>
            <div className="flex w-full gap-2">
            <h3 className="font-bold">Field :</h3>
            <h5>{item.field}</h5>
            </div>
            <div className="flex w-full gap-2">
            <h3 className="forn-bold">Qualification :</h3>
            <h5>{item.qualification}</h5>
            </div>
            {/*  duration */}
            {/* <div className="flex w-full flex-col">
            <div className="flex w-full flex-col">
            <h3 className="font-bold">From</h3>
            <h5>{item.from.toDateString()}</h5>
            </div>
            <div className="flex w-full flex-col">
            <h3 className="font-bold">To</h3>
            <h5>{item.to.toDateString()}</h5>
            </div>
            </div> */}

        </div>
      )
    })}
 </div>
);
}
