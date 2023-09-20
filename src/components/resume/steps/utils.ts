interface FinalResume{
    name:string;
    email:string;
    phone:string;
    website:string;
    summary:string;
    skills:string[];
    education:string[];
    experience:string[];
    projects:string[];
    hackathons:string[];
    content:string[];
}


export function resumeTemplateString({name,email,phone,website,education,summary,skills,experience,projects,hackathons,content}:FinalResume){
const resume = `
# Contact Information

name: ${name}
email: ${email}
phone: ${phone}
website: ${website}

# Summary

${summary}

# Skills

* ${skills}

# Experience

* ${experience}

# Projects

* ${projects}

# Hackathons Attended

* ${hackathons}

# Content

* ${content}

# Education

* ${education}

`;
}
