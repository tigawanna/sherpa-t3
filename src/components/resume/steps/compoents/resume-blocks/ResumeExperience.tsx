import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumeExperienceProps {
resume:ResumeFields
}

export function ResumeExperience({resume}:ResumeExperienceProps){
if(resume.experience.length === 0) return null

    const dateToString = (date: Date | string) => {
      if (date instanceof Date) {
        return date.toISOString().slice(0, 10);
      }
      return new Date(date).toISOString().slice(0, 10);
    };
return (
 <div className='w-full h-full flex flex-col'>
  <h2 className="font-bold  w-full">Experience</h2>
  {resume.experience.map((item)=>{
    return (
      <div className="border p-1" key={item.id}>
        <h3 className="font-bold ">{item.company}</h3>
        <div className="flex w-full gap-2">
          <h3 className="font-bold">Role :</h3>
          <h5>{item.position}</h5>
        </div>
        <div className="flex w-full gap-2">
          <h3 className="forn-bold">Duration :</h3>
          <h5>
            {dateToString(item.from)} - {dateToString(item?.to)}
          </h5>
        </div>
      </div>
    );
  })}

 </div>
);
}
