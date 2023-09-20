import { ResumeFields } from "../ResumeMutiStepForm";

import { ResumePersonalBasics } from "./resume-blocks/ResumePersonalBasics";
import { ResumeEducation } from "./resume-blocks/ResumeEducation";
import { ResumeProjects } from "./resume-blocks/ResumeProjects";
import { ResumeHackathons } from "./resume-blocks/ResumeHackathons";
import { ResumeExperience } from "./resume-blocks/ResumeExperience";
import { ResumeRefrences } from "./resume-blocks/ResumeRefrences";
import ReactDOMServer from "react-dom/server";



interface ResumeTemplateProps {
  resume?: ResumeFields;
}

export function ResumeTemplate({}: ResumeTemplateProps) {
  const resume = {
    name: "Jane Smith",
    email: "example2@example.com",
    phone: "789012",
    country: "Canada",
    city: "Toronto",
    summary: `
Margins - One-inch margins on every side
Font - Pick a unique font that remains professional 
Font Size - Use a font size of 11-12pt for normal text and 14-16pt for headers
Line Spacing - Use 1.0 or 1.15 line spacing
Resume Length - Keep your resume to one page. For guidance, view our one-page resume templates.
    `,
    website: "",
    github_username: "codediodeio",
    projects: [
      {
        id: "1198440c-d662-4fd7-8b54-c4e4a5215688",
        name: "gimmie-sticker",
        description: "Trade a Pull Request for a Sticker",
        languages: ["JavaScript"],
        libraries: ["fs-extra", "inquirer", "node-rsa"],
      },
      {
        id: "70c84765-0439-4444-b662-321f2fb2da87",
        name: "firestore-migrator",
        description:
          ":bullettrain_side: A CLI utility for moving data to and from Cloud Firestore",
        languages: ["TypeScript"],
        libraries: [
          "commander",
          "dot-object",
          "firebase-admin",
          "fs-extra",
          "lodash",
          "shortid",
          "xlsx",
          "typescript",
        ],
      },
      {
        id: "a81d5b40-f894-45a3-aae6-95c14f1a25cd",
        name: "rektor-db",
        description: "Rektor Vector Database",
        languages: [],
        libraries: [],
      },
    ],
    skills: ["vue"],
    languages: ["JavaScript", "TypeScript"],
    libraries: [
      "fs-extra",
      "inquirer",
      "node-rsa",
      "commander",
      "dot-object",
      "firebase-admin",
      "fs-extra",
      "lodash",
      "shortid",
      "xlsx",
      "typescript",
    ],
    hackathons: [
      {
        id: "799cd6e4-7af0-426e-a57d-8e872f8aeb02",
        name: "refine dev hackathon",
        description:
          "build cool react project with refine dev , MUI and supabase",
        technologies: [],
      },
    ],
    content: [],
    references: [
      {
        company: "Acme",
        contact: "0788920333",
        name: "Janet mugisha",
      },
      {
        company: "EMCA",
        contact: "50999020",
        name: "James Mugisha",
      },
    ],
    education: [
      {
        id: "155c18aa-c272-4986-8bce-abdb59ed115a",
        field: "Intro to computer science",
        from: "2022-01-04T00:00:00.000Z",
        to: "2023-02-08T00:00:00.000Z",
        qualification: "Certificate",
        school: "ALX software enginnering programme",
      },
    ],
    experience: [
      {
        position: "strict master",
        company: "Acme",
        from: "2023-06-07T00:00:00.000Z",
        to: "2023-09-09T16:24:29.447Z",
        id: "638670c6-a43b-4ede-8e5e-578b2e8941eb",
      },
    ],
  };
  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-2">
      {/*  */}
      <div className="flex h-full w-full items-center justify-center gap-2">
        {/*  basics details */}

        {/*  resume details */}
        <article className="flex h-full w-full flex-col  gap-1 p-2">
          <ResumePersonalBasics resume={resume} />
          <ResumeExperience resume={resume} />
          <ResumeProjects resume={resume} />
          <ResumeEducation resume={resume} />
          <ResumeHackathons resume={resume} />
          <ResumeRefrences resume={resume} />
        </article>
      </div>
    </div>
  );
}


// Convert React component to text
const text = ReactDOMServer.renderToString(<ResumeTemplate />);
console.log(text);
