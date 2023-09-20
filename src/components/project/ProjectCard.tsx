
import { DeleteConfirm } from "../modal/DeleteConfirm";
import { Project } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Image } from "@unpic/react";
import { toast } from "react-toastify";
import Link from "next/link";

interface ProjectCardProps {

  item: Project;
}

export function ProjectCard({ item }: ProjectCardProps) {
  const router = useRouter();
  const user_id = router.query.id as string;
  const delete_mutation = api.project.removeOne.useMutation();
  const utils = api.useContext();

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then(() => {
        toast("Project deleted successfully", { type: "success" });
        utils.project.invalidate();
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }
  const modal_id="delete_project_modal";
  return (
    <div
      key={item.id}
      className="sm:2-[45%] card  max-h-[400px] min-h-[200px] 
             w-[95%] border  bg-base-100 shadow-xl hover:border-accent md:w-[30%]"
    >
      <DeleteConfirm
        is_loading={delete_mutation.isLoading}
        handleDelete={() => handleDelete(item.id)}
        modal_id={modal_id}
      />
      <Link
        href={`/profile/${user_id}/project/${item.id}`}
        key={item.id}
        className="flex h-full w-full flex-col"
      >
        <figure className="h-full w-full ">
          <Image
            src={item.image_url ?? "https://picsum.photos/id/4/500/333"}
            alt={item.name}
            loading="lazy"
            layout="fullWidth"
            height={200}
            className="h-auto w-full"
          />
        </figure>
        <div className="flex w-full flex-col gap-1 p-3">
          <h2 className="card-title">{item.name}</h2>
          <p className="line-clamp-1 text-sm">{item.description}</p>
        </div>
      </Link>
    </div>
  );
}
