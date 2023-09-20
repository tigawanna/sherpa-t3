import {  GithubIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import { ProjectInputType } from "~/server/api/routers/project";
import { useDebouncedValue } from "~/state/hooks/debounce";
import { api } from "~/utils/api";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { SearchGithubprojects } from "./SearchGithubprojects";
import { TheFormModal } from "../modal/TheFormModal";

interface SearchProjectModalProps {
  github_username: string;
  modal_id: string;
  user_id: string;
  project: ProjectInputType;
  projectList: ProjectInputType[];
  setProject: React.Dispatch<React.SetStateAction<ProjectInputType>>;
  setProjectLists: React.Dispatch<React.SetStateAction<ProjectInputType[]>>;
}

export function SearchProjectModal({
  github_username,
  modal_id,
  project,
  setProject,
  projectList,
  setProjectLists,
  user_id
}: SearchProjectModalProps) {
  const [keyword, setKeyword] = useState("");
const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

  const query = api.project.search.useQuery(
    {
      user_id: user_id,
      keyword: debouncedValue,
    },

  );



  function handleChange(e: any) {
    setKeyword(e.target.value);
  }

  function addProjectTList(project: ProjectInputType) {
    setProjectLists(prev=>[...prev, project]);
  }

  const is_project_in_list = (project: ProjectInputType) => {
    return projectList.some((p) => p.id === project.id);
  }
  const project_search_results = query.data;
 
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className=" relative flex w-full items-center justify-center gap-1">
        <TheTextInput
          value={keyword}
          field_key={"keyword"}
          field_name="Search"
          onChange={handleChange}
        />
        {((query.isFetching && query.isLoading) || isDebouncing) && (
          <div className="absolute top-[20%] flex w-full items-center justify-center gap-3 p-2">
            <span className="loading loading-infinity loading-lg text-warning"></span>
          </div>
        )}
      </div>


      <div className="flex h-full w-full flex-wrap items-center justify-center gap-2 p-2">
        {project_search_results &&
          project_search_results.map((project_search) => {
            return (
              <div
                key={project_search.name + project.id}
                className="flex  w-full items-center justify-center 
                gap-1 rounded border-2 px-2 py-1 hover:border-accent "
              >
                {/* text and description */}
                <div className=" flex w-[90%] flex-col items-center justify-center gap-1 px-2 ">
                  <div className="flex w-full  items-center">
                    <h3 className="w-full text-2xl font-bold">
                      {project_search.name}
                    </h3>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center">
                    {project_search?.description !== "" && (
                      <div className="flex w-full items-center justify-center">
                        <p className="w-full text-sm">
                          {project_search.description}
                        </p>
                      </div>
                    )}
                <div className="flex w-full items-center justify-center gap-2">
                      {/* <h3 className="font-bold ">languages</h3> */}
                      <h2 className="w-full">
                        {JSON.stringify(project_search.languages)}
                      </h2>
                    </div>
                  </div>
                </div>

                {/*  controls */}

                <span className="flex flex-col items-center  gap-1">
                  {is_project_in_list(project_search as ProjectInputType) ? (
                    <button title="Remove list item" className="btn" type="button">
                      <X
                        onClick={(e) => {
                          setProjectLists((prev) =>
                            prev.filter(
                              (project) => project.id !== project_search.id
                            )
                          );
                        }}
                        className="h-6 w-6 text-error"
                      />
                    </button>
                  ) : (
                    <button
                      title="Add to list item"
                      type="button"
                      onClick={() => {
                        // setProject(project_search as ProjectInputType);
                        // setProjectToGenerate("");
                        // closeModal(modal_id);
                        addProjectTList(project_search as ProjectInputType);
                      }}
                      className="btn"
                    >
                      <Plus className="h-6 w-6 text-success" />
                    </button>
                  )}
                </span>
              </div>
            );
          })}
        
      </div>
    </div>
  );
}
