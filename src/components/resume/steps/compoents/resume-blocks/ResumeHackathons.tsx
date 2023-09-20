import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumeHackathonsProps {
resume:ResumeFields
}

export function ResumeHackathons({resume}:ResumeHackathonsProps){
    if (resume.hackathons.length === 0) return null;
    const hackathons = resume.hackathons
return (
  <div className="flex h-full w-full flex-col gap-2">
    <h3 className="border-b font-bold">Hackathons</h3>
    <div className="flex h-full w-full flex-wrap items-center gap-2">
      {hackathons.map((item, idx) => {
        return (
          <div className="h-full  max-w-[45%] gap-2 border p-1" key={item.id}>
            <h3 className="font-bold">{item.name}</h3>
            <div className="flex gap-2">
              <p className="line-clamp-1 font-serif text-sm">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}
