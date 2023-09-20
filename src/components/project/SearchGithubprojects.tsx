import { useState } from "react";
import { useDebouncedValue } from "~/state/hooks/debounce";
import { api } from "~/utils/api";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { RepositoryResponse } from "~/server/api/routers/github/types";
import { ProjectInputType } from "~/server/api/routers/project";
import { GithubGeneratedProjectForm } from "./GithubGeneratedProject";

interface SearchGithubprojectsProps {
  github_username: string;
  modal_id: string;
  setProject: React.Dispatch<React.SetStateAction<ProjectInputType>>;
  project: ProjectInputType;
  direct_create?: boolean;
  addProjectTList?: (project: ProjectInputType) => void;
}

export function SearchGithubprojects({
  github_username,
  setProject,
  project,
  addProjectTList,
  modal_id,
  direct_create = false,
}: SearchGithubprojectsProps) {
  const [keyword, setKeyword] = useState("");
  const [projectToGenerate, setProjectToGenerate] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);



  const query = api.github.searchRepoByName.useQuery({
    owner: github_username,
    keyword: debouncedValue,
  });
  const project_query = api.github.getProjectFromGithub.useQuery(
    {
      owner: github_username,
      repo: projectToGenerate,
    },
    {
      enabled: projectToGenerate.length > 2,
      retry: false,
    }
  );

  function handleSelectProject(repo: RepositoryResponse) {
    setProjectToGenerate(repo.name as string);
  }

  function handleChange(e: any) {
    setKeyword(e.target.value);
  }

  // if (project_query.data) {
  //   const project_search = project_query.data;
  //   // console.log("project serach === ",project_search)
  //   return (
  //     <div className="flex h-full w-full flex-col  items-center justify-center gap-4">

  //       <div className=" flex w-[90%] flex-col items-center justify-center gap-4 p-2 text-success">
  //         <div className="flex w-full  items-center">
  //           <h3 className="w-full text-2xl font-bold">{project_search.name}</h3>
  //         </div>
  //         <div className="flex w-full flex-col items-center justify-center">
  //           {project_search?.description !== "" && (
  //             <div className="flex w-full items-center justify-center">
  //               Description:
  //               <p className="w-full text-sm">{project_search.description}</p>
  //             </div>
  //           )}

  //           {project_search.languages &&
  //             project_search.languages.length > 0 && (
  //               <div className="flex w-full items-center justify-center gap-2">
  //                 {/* <h3 className="font-bold ">languages</h3> */}
  //                 <h2 className="w-full">
  //                   {JSON.stringify(project_search.languages)}
  //                 </h2>
  //               </div>
  //             )}
  //         </div>
  //       </div>

  //       <span className="flex w-full items-center justify-evenly gap-4">
  //         <button
  //            type="button"
  //            onClick={() => {
  //             if (direct_create) {
  //               create_mutation
  //                 .mutateAsync(project)
  //                 .then(() =>
  //                   toast("Project added successfully", { type: "success" })
  //                 )
  //                 .catch((error: any) =>
  //                   toast(error.message, { type: "error", autoClose: false })
  //                 );
  //             }
  //             setProject((prev) => {
  //               return project_query.data;
  //             });

  //             addProjectTList && addProjectTList(project_query.data);
  //             setProjectToGenerate("");
  //             const hidden_checkbox = document.getElementById(
  //               modal_id
  //             ) as HTMLInputElement;
  //             if (hidden_checkbox && hidden_checkbox.type === "checkbox") {
  //               hidden_checkbox.checked = false;
  //             }
  //           }}
  //           className="btn btn-outline"
  //         >
  //           <Check className="h-6 w-6 text-success" />
  //         </button>
  //         <button
  //           onClick={() => {
  //             setProjectToGenerate("");
  //             const hidden_checkbox = document.getElementById(
  //               modal_id
  //             ) as HTMLInputElement;
  //             if (hidden_checkbox && hidden_checkbox.type === "checkbox") {
  //               hidden_checkbox.checked = false;
  //             }
  //           }}
  //           className="btn btn-outline"
  //         >
            
  //           <X className="h-6 w-6 text-error" />
  //         </button>
  //       </span>

  //     </div>
  //   );
  // }
  if(project_query.data){
    return(
      <GithubGeneratedProjectForm
        project={project}
        generated_project={project_query.data}
        modal_id={modal_id}
        setProject={setProject}
        setProjectToGenerate={setProjectToGenerate}
        addProjectTList={addProjectTList}
        direct_create={direct_create}

      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col  items-center justify-center gap-2">
      <div className=" relative flex w-full items-center justify-center">
        <TheTextInput
          value={keyword}
          field_key={"keyword"}
          field_name="Search"
          onChange={handleChange}
        />
        {(isDebouncing || query.isLoading) && (
          <div className="absolute top-[20%] flex w-full items-center justify-center p-2">
            <span className="loading loading-infinity loading-lg text-warning"></span>
          </div>
        )}
      </div>

      {query.isError && (
        <div className="flex w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-error">
            {query.error.message}
          </div>
        </div>
      )}

      {project_query.isError && (
        <div className="flex w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-error">
            {project_query.error.message}
          </div>
        </div>
      )}

      <div className="flex w-full flex-wrap  items-center justify-center gap-2">
        
        {query.data &&
          query.data?.items?.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className="card relative min-h-[100px] w-[95%] cursor-pointer border bg-base-100 shadow-xl  hover:border-accent "
              >
                <div className="flex w-full flex-col gap-1 p-2">
                  <div className="flex w-full  items-center">
                    <h3 className="w-full text-2xl font-bold">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center">
                    {project?.description !== "" && (
                      <div className="flex w-full items-center justify-center">
                        <p className="line-clamp-3 w-full">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </div>
                  {projectToGenerate === project.name &&
                    project_query.isLoading && (
                      <div className=" absolute flex h-full w-full items-center justify-center bg-base-200 bg-opacity-70">
                        <span className="loading loading-infinity loading-lg text-accent"></span>
                      </div>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
