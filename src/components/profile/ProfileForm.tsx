
import { ThePicUrlInput } from "../form/ThePicUrlInput";
import {  useState } from "react";
import { TheTextInput } from "../form/inputs/TheTextInput";
import { TheTextAreaInput } from "../form/inputs/TheTextArea";
import { TheCountryFields } from "../form/TheCountryFields";
import { useFormHook } from "../form/useForm";
import { api } from "~/utils/api";
import { Edit, Loader } from "lucide-react";
import { toast } from "react-toastify";
import { UserProfileInputType } from "~/server/api/routers/account";
import { TheListInput } from "../form/inputs/ListInput";



interface ProfileFormProps {
  user:Partial<UserProfileInputType>
  updating?:boolean
}



export function ProfileForm({user,updating}:ProfileFormProps){

const create_mutation = api.profile.addNew.useMutation()
const update_mutation = api.profile.updateOne.useMutation()

const { handleChange, input, setError, setInput, validateInputs } =
  useFormHook<UserProfileInputType>({
    initialValues: {
      id: user.id ?? "",
      about_me: user.about_me ?? "",
      email: user.email ?? "",
      github_username: user.github_username ?? "",
      linkedin_username: user.linkedin_username ?? "",
      name: user.name ?? "",
      image_url: user.image_url ?? "",
      country: user.country ?? "",
      city: user.city ?? "",
      phone: user.phone ?? "",
      skills: user.skills ?? [],
    },
  });
// const CREATE_USER_PROFILE_MUTATION = gql`
//   mutation CreateUserProfileMutation($input: CreateUserProfileInput!) {
//     createUserProfile(input: $input) {
//       id
//     }
//   }
// `

  // const [createUserProfile, { loading, error }] = useMutation(
  //   CREATE_USER_PROFILE_MUTATION,
  //   {
  //     onCompleted: () => {
  //       toast.success('UserProfile created')
  //     },
  //     onError: (error) => {
  //       toast.error(error.message)
  //     },
  //   }
  // )

const [editing,setEditing] = useState(!updating)


function handleSubmit(e:React.FormEvent<HTMLFormElement>){
e.preventDefault()
e.stopPropagation()

if(editing){
if(updating){
  update_mutation
    .mutateAsync(input)
    .then(() => toast("Profile created successfully", { type: "success" }))
    .catch((error) => toast(error.message, { type: "error" ,autoClose: false}));
}
else{
  create_mutation
    .mutateAsync(input)
    .then(() => toast("Profile created successfully", { type: "success" }))
    .catch((error) => toast(error.message, { type: "error" ,autoClose: false}));
}
}
}

const text_fields:Array<keyof UserProfileInputType>=["email","name","github_username","linkedin_username"]
const text_area_fields:Array<keyof UserProfileInputType>=["about_me"]


return (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="m-1 flex h-full w-full flex-col items-center justify-center"
    >
      <div className="flex w-full justify-end px-5">
        <Edit
          className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <div
        className="flex  h-full w-full flex-col gap-10
       rounded-lg bg-secondary/5 p-2 md:flex-row"
      >
        {/* avatar */}
        <ThePicUrlInput
          container_classname="w-fit"
      
          img_url={input.image_url}
          editing={editing}
          setInputImage={(url) =>
            setInput((prev) => {
              return {
                ...prev,
                image_url: url ?? "",
              };
            })
          }
        />

        <div className="flex h-full w-full flex-col items-center gap-5">
          {/* text fields */}
          <div className="flex w-full flex-col items-center justify-center gap-1 md:flex-row">
            {text_fields.map((field) => {
              return (
                <TheTextInput
                  key={field}
                  field_key={field}
                  value={input[field]}
                  // input={input}
                  field_name={field}
                  className="input input-bordered input-sm w-full  "
                  label_classname="text-base capitalize"
                  onChange={handleChange}
                  editing={editing}
                />
              );
            })}
          </div>
          {/* text area fields */}
          <div className="flex w-full flex-col items-center justify-center gap-1 ">
            {text_area_fields.map((field) => {
              return (
                <TheTextAreaInput
                  field_key={field}
                  key={field}
                  value={input[field]}
                  // input={input}
                  field_name={field}
                  onChange={handleChange}
                  label_classname="text-base capitalize"
                  editing={editing}
                />
              );
            })}
          </div>

          <TheCountryFields
            editing={editing}
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

          <TheListInput
            editing={editing}
            field_name="Skills"
            field_key="skills"
            input={input}
            setInput={setInput}
          />

          {editing && (
            <div className="flex w-full items-center justify-center">
              <button className="btn btn-sm  mt-2 w-[80%] sm:w-[70%] md:w-[40%] ">
                {create_mutation.isLoading || update_mutation.isLoading ? (
                  <Loader className="h-6 w-6 animate-spin" />
                ) : (
                  <div></div>
                )}
                {updating ? "Update" : "Create"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  </div>
);
}
