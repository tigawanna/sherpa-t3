
import { ResumeFields } from "../../ResumeMutiStepForm";

interface ResumePersonalBasicsProps {
  resume: ResumeFields;
}

export function ResumePersonalBasics({ resume }: ResumePersonalBasicsProps) {
  return (
    <div className="flex w-full gap-4">
      <div className="flex w-full flex-wrap gap-2">
        <div className="flex w-full gap-2 p-2">
          <h2 className="text-4xl font-bold">{resume.name}</h2>
        </div>

        <div className="flex flex-wrap w-full gap-2">
          {/*  phone */}
          <div className="flex gap-1">
            <h3 className="font-bold">Phone</h3>
            <h5 className="">{resume.phone}</h5>
          </div>

          {/*  email */}
          <div className="flex  gap-1 ">
            <h3 className="font-bold">Email</h3>
            <h5>{resume.email}</h5>
          </div>
        </div>

        {/*  summary */}
        <div className="flex w-full flex-wrap gap-2">
          <p className="prose">{resume.summary}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 p-2">
        <h3 className="text-xl font-bold">Web developer</h3>
        {/*  country  city*/}
        <div className="flex flex-wrap items-center gap-3">
          {/*  country */}
          <div className="flex flex-wrap gap-2">
            <h3 className="font-bold">Country</h3>
            <h5>{resume.country}</h5>
          </div>
          {/*  city */}
          <div className="flex flex-wrap gap-2">
            <h3 className="font-bold">City</h3>
            <h5>{resume.city}</h5>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 p-2">
          {resume.languages.length > 0 && (
            <div className="flex h-full flex-col">
              <h3 className="border-b font-bold">Languages</h3>
              <div className="flex items-center   gap-2">
                {resume.languages.map((item, idx) => {
                  return (
                    <li className="list-item" key={item + idx}>
                      {item}
                    </li>
                  );
                })}
              </div>
            </div>
          )}

          {resume.libraries.length > 0 && (
            <div className="flex h-full w-full flex-col justify-center">
              <h3 className="border-b font-bold">Libraries</h3>
              <div className="flex w-full flex-wrap items-center gap-2">
                {resume.libraries.map((item, idx) => {
                  return (
                    <li className="min-w-[80px]" key={item + idx}>
                      {item}
                    </li>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
