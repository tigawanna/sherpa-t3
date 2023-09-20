import { GithubIcon } from "lucide-react";
import project from "~/pages/profile/[id]/project";
import { TheFormModal } from "../modal/TheFormModal";
import { SearchGithubprojects } from "./SearchGithubprojects";
import { ProjectInputType } from "~/server/api/routers/project";
import { UserProfile } from "@prisma/client";

interface AddFromGithubProps {
modal_id: string;
project: ProjectInputType;
setProject: React.Dispatch<React.SetStateAction<ProjectInputType>>;
profile:UserProfile
}

export function AddFromGithub({modal_id,profile,project,setProject}:AddFromGithubProps){
return (
  <TheFormModal
    id={modal_id}
    close_on_bg_click={true}
    label={
      <span className="btn btn-outline flex gap-2 ">
        <h3> add from github</h3>
        <GithubIcon className="h-6 w-6" />
      </span>
    }
  >
    <SearchGithubprojects
      project={project}
      github_username={profile.github_username ?? ""}
      setProject={setProject}
      modal_id={modal_id}
    />
  </TheFormModal>
);
}
