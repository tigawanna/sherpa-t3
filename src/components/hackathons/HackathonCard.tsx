import { Hackathon } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { DeleteConfirm } from "../modal/DeleteConfirm";
import { toast } from "react-toastify";

interface HackathonCardProps {
  item: Hackathon;
}

export function HackathonCard({ item }: HackathonCardProps) {
  const router = useRouter();
  const user_id = router.query.id as string;
  const delete_mutation = api.hackathon.removeOne.useMutation();
  const utils = api.useContext();
  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then(() => {
        toast("Project deleted successfully", { type: "success" });
        utils.hackathon.invalidate();
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }
  const modal_id = "delete_hackathon_modal";
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border 
      p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
    >
      <DeleteConfirm
        is_loading={delete_mutation.isLoading}
        handleDelete={() => handleDelete(item.id)}
        modal_id={modal_id}
      />
      <Link
      href={`/profile/${user_id}/hackathon/${item.id}`}
      className="hover:bg-base-300 hover:text-accent"
      >

      <h3 className="text-2xl font-bold">{item.name}</h3>
      <h3 className="">{item.description}</h3>

      </Link>

      <div className="flex w-full flex-wrap gap-2 p-1">
        {item?.technologies &&
          item?.technologies.map((tech) => (
            <h2 key={tech} className="rounded-xl border border-accent px-2">
              {tech}
            </h2>
          ))}
      </div>

      <div className=" flex w-[90%] items-center justify-between border-t border-t-accent text-sm">
        <h3>From : {item.from.toISOString().split("T")[0]}</h3>
        <h3>To : {item.to.toISOString().split("T")[0]}</h3>
      </div>
    </div>
  );
}
