import { Plus} from "lucide-react";
import { api } from "~/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProjectCard } from "./ProjectCard";

interface ProjectsProps {
  
}

export function Projects({}: ProjectsProps) {
  const router = useRouter();
  const profile_id = router.query.id as string;
  const query = api.project.getAll.useQuery({ user_id: profile_id });

  if (query.isLoading) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <span className="loading loading-infinity loading-lg text-warning"></span>
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }
  if (!query.data || (query.data && query.data.length === 0)) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link
          href={`/profile/${profile_id}/project/new`}
          className="btn btn-outline"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    );
  }
  const projects = query.data;

return (
    <div className="relative flex h-full w-full  flex-col gap-2 pb-5">
      <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          href={`/profile/${profile_id}/project/new`}
          className="btn btn-outline sticky right-[3%] top-[3%]"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>

      <div className="flex h-full w-full flex-wrap  gap-2 px-5 pb-5 pt-2">
        {projects.map((project) => {
          return <ProjectCard key={project.id} item={project} />;
        })}
      </div>
    </div>
  );
}
