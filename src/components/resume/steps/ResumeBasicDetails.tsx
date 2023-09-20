import { api } from "~/utils/api";
import { ResumeFields } from "./ResumeMutiStepForm";
import { useRouter } from "next/router";
import { TheTextInput } from "~/components/form/inputs/TheTextInput";
import { TheTextAreaInput } from "~/components/form/inputs/TheTextArea";
import { TheListInput } from "~/components/form/inputs/ListInput";
import { TheCountryFields } from "~/components/form/TheCountryFields";
import { useEffect } from "react";

interface BasicDetailsProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

type ResumeProfile = Pick<ResumeFields,"name"|"email"|"phone"|"github_username"|"summary"|"website"|"skills">

export function ResumeBasicDetails({input,setInput,handleChange}:BasicDetailsProps){
    const router = useRouter();
    const query = api.profile.getOne.useQuery({
        id: router.query.id as string
    })

    useEffect(() => {
      if (!query.isLoading&&query.data) {
      setInput((prev) => {
          return {
            ...prev,
            name: query.data?.name ?? "",
            email: query.data?.email ?? "",
            phone: query.data?.phone ?? "",
            github_username: query.data?.github_username ?? "",
            summary: query.data?.about_me ?? "",
            skills: query.data?.skills ?? [],
            country: query.data?.country ?? "",
            city: query.data?.city ?? "",
          };
        });
      }
    },[query.data])


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
  const profile = query.data
return (
  <div className="flex h-full  w-full items-center justify-center">
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <TheTextInput<ResumeProfile>
          field_key={"name"}
          field_name="Name"
          onChange={handleChange}
          value={input.name}
        />
        <TheTextInput<ResumeProfile>
          field_key={"email"}
          field_name="Email"
          type="email"
          onChange={handleChange}
          value={input.email}
        />
      </div>
      <TheCountryFields
        editing={true}
        country={{
          city: input.city,
          country: input.country,
          phone: input.phone,
        }}
        setInput={(value) =>
          setInput((prev) => {
            return {
              ...prev,
              country: value.country,
              phone: value.phone,
              city: value.city,
            };
          })
        }
      />
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <TheTextInput<ResumeProfile>
          container_classname="md:w-fit md:min-w-[20%]"
          field_key={"phone"}
          field_name="Phone"
          type="tel"
          onChange={handleChange}
          value={input.phone}
        />
        <TheTextInput<ResumeProfile>
          container_classname="md:w-fit md:min-w-[40%]"
          field_key={"website"}
          field_name="Website"
          type="url"
          onChange={handleChange}
          value={input.website}
        />
        <TheTextInput<ResumeProfile>
          container_classname="md:w-fit md:min-w-[30%]"
          field_key={"github_username"}
          field_name="Github Username"
          onChange={handleChange}
          value={input.github_username}
        />
      </div>
      <TheTextAreaInput<ResumeProfile>
        field_key={"summary"}
        field_name="Summary"
        onChange={handleChange}
        value={input.summary}
      />
      <TheListInput
        editing={true}
        field_key="skills"
        field_name="Skills"
        input={input}
        setInput={setInput}

      />
    </div>
  </div>
);
}
