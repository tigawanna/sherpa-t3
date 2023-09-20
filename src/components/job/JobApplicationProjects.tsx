import { Plus, GithubIcon, X } from "lucide-react";
import { JobApplication } from "~/server/api/routers/jobs-application";
import { TheFormModal } from "../modal/TheFormModal";
import { SearchGithubprojects } from "../project/SearchGithubprojects";
import { SearchProjectModal } from "../project/SearchProjectModal";
import { useState } from "react";
import { ProjectInputType } from "~/server/api/routers/project";
import { UserProfile } from "@prisma/client";
import Link from "next/link";

interface JobApplicationProjectsProps {
  input: JobApplication;
  setInput: React.Dispatch<React.SetStateAction<JobApplication>>;
  editing: boolean;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  user_profile: UserProfile;
}

export function JobApplicationProjects({
  editing,
  handleChange,
  input,
  setInput,
  user_profile,
}: JobApplicationProjectsProps) {
  const [projectList, setProjectLists] = useState<ProjectInputType[]>([]);
  const [project, setProject] = useState<ProjectInputType>({
    id: "",
    description: "",
    languages: [],
    repoUrl: "",
    image_url: "",
    name: "",
    libraries: [],
    userProfileId: user_profile.id,
  });
  function addProjectTList(project: ProjectInputType) {
    setProjectLists((prev) => [...prev, project]);
  }
  function removeFromList(project: ProjectInputType) {
    setProjectLists((prev) => prev.filter((proj) => proj.id !== project.id));
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-3  p-2">
         <div className="flex h-full flex-wrap w-full items-center justify-center gap-5">
            <TheFormModal
              id="serach_github_in_job_appliaction_modal"
              label={
                <span className="btn btn-sm flex h-fit gap-2 border p-3">
                  <h3> add a project</h3>
                  <Plus className="h-4 w-4" />
                </span>
              }
            >
              <SearchProjectModal
                project={project}
                projectList={projectList}
                setProject={setProject}
                setProjectLists={setProjectLists}
                github_username={user_profile.github_username}
                modal_id="add_project_to_application"
                user_id={user_profile.id}
              />
            </TheFormModal>

            <TheFormModal
              id="serach_github_for_job_appliaction_modal_multi_step"
              label={
                <span className="btn btn-sm flex h-fit gap-2 border p-3">
                  <h3> add from github</h3>
                  <GithubIcon className="h-4 w-4" />
                </span>
              }
            >
              <SearchGithubprojects
                direct_create
                project={project}
                github_username={user_profile.github_username}
                setProject={setProject}
                modal_id={"serach_github_for_job_appliaction_modal_multi_step"}
              />
            </TheFormModal>
          </div>
          {projectList.map((project) => (
            <div
              className="flex w-fit items-center justify-between rounded-lg border p-1"
              key={project.id}
            >
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full flex-col items-center gap-2 hover:text-fuchsia-600"
              > <h1 className="font-bold">{project.name}</h1>
          
              </Link>

              <X
                className="h-6 w-6 text-error"
                onClick={() => removeFromList(project)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
