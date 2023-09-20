import { Plus, X } from "lucide-react";
import Link from "next/link";
import { api } from "~/utils/api";
import { ResumeFields } from "./ResumeMutiStepForm";
import { useEffect, useState } from "react";
import { Hackathon } from "@prisma/client";

interface ResumeHackathonsProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export function ResumeHackathons({
  user_id,
  input,
  setInput,
}: ResumeHackathonsProps) {
  const query = api.hackathon.getAll.useQuery({
    user_id,
  });

  // useEffect(()=>{
  //   if(query.data){
  //     const hackathons = query.data.map(({name,description,technologies})=>{
  //       return { name, description, technologies };
  //     })
  //     setInput((prev)=>{
  //       return {
  //         ...prev,
  //       hackathons
  //       }
  //     })
  //   }
  // },[query.data]);

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
        <Link
          href={`/profile/${user_id}/hackathon/new`}
          className="btn btn-outline"
        >
          <Plus className="h-10 w-10 hover:text-accent" />
        </Link>
      </div>
    );
  }
  const thons = query.data;
  const isSelected = (id: string) => {
    return input.hackathons.some((val) => {
      return val.id === id;
    });
  };
  const handleAddItem = ({
    id,
    name,
    description,
    technologies,
  }: Hackathon) => {
    
    setInput((prev) => {
      if (prev.hackathons.some((val) => {
          return val.id === id;
        })
      ) {
        return prev;
      }
      return {
        ...prev,
        hackathons: [
          ...prev.hackathons,
          { id, name, description, technologies },
        ],
      };
    });
  };
  const handleRemoveItem = ({ name }: Hackathon) => {
    setInput((prev) => {
      const filterd_hackathons = prev.hackathons.filter(
        (item) => item.name !== name
      );
      return { ...prev, hackathons: filterd_hackathons };
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {thons.map((item) => {
          return (
            <div
              key={item.id}
              className="flex w-full flex-col justify-center gap-1 rounded-md border 
          p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
            >
              <div className=" flex w-full items-center justify-end">
                {isSelected(item.id) ? (
                  <X
                    className="h-6 w-6 text-error"
                    onClick={() => handleRemoveItem(item)}
                  />
                ) : (
                  <Plus
                    className="h-6 w-6 text-success"
                    onClick={() => handleAddItem(item)}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <h3 className="">{item.description}</h3>
              <div className="flex w-full flex-wrap gap-2 p-1">
                {item?.technologies &&
                  item?.technologies.map((tech) => (
                    <h2
                      key={tech}
                      className="rounded-xl border border-accent px-2"
                    >
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
        })}
      </div>
    </div>
  );
}
