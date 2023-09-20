import { ProfileForm } from "../profile/ProfileForm";
import { useState } from "react";

interface DefaultProfilesProps {

}

export function DefaultProfiles({}:DefaultProfilesProps){
const dummey_profiles = [
  {
    id: "example1@example.com",
    email: "example1@example.com",
    name: "John Doe",
    about_me: "Lorem ipsum dolor sit amet",
    image_url: "https://picsum.photos/id/0/500/333",
    country: "USA",
    city: "New York",
    phone: "123456",
    skills: ["react"],
  },
  {
    id: "example2@example.com",
    email: "example2@example.com",
    name: "Jane Smith",
    about_me: "Lorem ipsum dolor sit amet",
    image_url: "https://picsum.photos/id/1/500/333",
    country: "Canada",
    city: "Toronto",
    phone: "789012",
    skills: ["react"],
  },
  {
    id: "example3@example.com",
    email: "example3@example.com",
    name: "Alex Johnson",
    about_me: "Lorem ipsum dolor sit amet",
    image_url: "https://picsum.photos/id/2/500/333",
    country: "UK",
    city: "London",
    phone: "345678",
    skills: ["react"],
  },
  {
    id: "example4@example.com",
    email: "example4@example.com",
    name: "Emily Davis",
    about_me: "Lorem ipsum dolor sit amet",
    image_url: "https://picsum.photos/id/3/500/333",
    country: "Australia",
    city: "Sydney",
    phone: "901234",
    skills: ["react"],
  },
  {
    id: "example5@example.com",
    email: "example5@example.com",
    name: "Michael Wilson",
    about_me: "Lorem ipsum dolor sit amet",
    image_url: "https://picsum.photos/id/4/500/333",
    country: "Germany",
    city: "Berlin",
    phone: "567890",
    skills: ["react"],
  },
];
const [profile,setProofile]=useState(dummey_profiles[0])
return (
  <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-base-300 p-3">
    <div className="w-full flex flex-wrap gap-3">
    {dummey_profiles.map((profile,idx) => (
      <button type="button" key={profile.id} 
          className="btn btn-sm"
          onClick={()=>setProofile(dummey_profiles[idx])}>
            {profile.name}
    </button>
    ))}
</div>


    {profile&&<ProfileForm user={profile} key={profile?.id}/>}
  </div>
);
}
