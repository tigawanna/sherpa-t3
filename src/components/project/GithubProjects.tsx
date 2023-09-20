import { useState } from "react";
import { api } from "~/utils/api";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { useDebouncedValue } from "~/state/hooks/debounce";
import { Image } from "@unpic/react";

interface GithubProjectsProps {
profile_id:string
}

export function GithubProjects({profile_id}:GithubProjectsProps){

 const [keyword, setKeyword] = useState("")
 const {debouncedValue,isDebouncing}  = useDebouncedValue(keyword,2000)

const query = api.github.searchRepoByName.useQuery({
    owner: "tigawanna",keyword:debouncedValue
})

// if (query.isLoading) {
//     return (
//       <div className="flex h-full  w-full items-center justify-center p-2">
//         <span className="loading loading-infinity loading-lg text-warning"></span>
//       </div>
//     );
//   }
  if (query.isError) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border text-error p-2">
          {query.error.message}
        </div>
      </div>
    );
  }
  // if (!query.data) {
  //   return (
  //     <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
  //       <div className="rounded-lg border p-2">Nothing here</div>
  //   </div>
  //   );
  // }
  const random_number = Math.floor(Math.random() * 1000);
  
  function handleChange(e: any) {
    setKeyword(e.target.value);
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
      {(isDebouncing||query.isLoading) && (
        <div className="absolute top-[20%] flex w-full items-center justify-center p-2">
          <span className="loading loading-infinity loading-lg text-warning"></span>
        </div>
      )}
    </div>

    <div className="flex h-full w-full flex-wrap  items-center justify-center gap-2">
      {query.data&&query.data.items.map((project) => {
        return (
          <div
            key={project.id}
            className="card cursor-pointer hover:border-accent min-h-[100px] w-[95%] border bg-base-100  shadow-xl md:w-[45%] "
          >
            {/* <figure className="h-[200px] w-full ">
              <Image
                src={`https://opengraph.githubassets.com/${random_number}/${project?.owner?.login}/${project.name}`}
                alt={project.name}
                layout="fullWidth"
                height={200}
                loading="lazy"
                className="h-auto w-full"
                
              />
            </figure> */}
            <div className="flex w-full flex-col gap-1 p-2">
              <h2 className="card-title text-2xl font-bold text-accent/70">
                {project.name}
              </h2>
              <p className="line-clamp-2 w-full text-sm">
                {project.description}
              </p>
              {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
}
