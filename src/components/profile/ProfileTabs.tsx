import { useState } from "react";
import { Projects } from "../project/Projects";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Educations } from "../education/Educations";
import { Internships } from "../internship/Internships";
import { Experience } from "../experience/Experiences";
import { Contents } from "../content/Contents";
import { Hackathons } from "../hackathons/Hackathons";



interface ProfileTabsProps {
  user_id: string;
}

export function ProfileTabs({ user_id }: ProfileTabsProps) {
    const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (event:any) => {
      const { deltaX } = event;
      setScrollPosition((prevScrollPosition) => prevScrollPosition + deltaX);
    };
return (
  <div className="flex h-full w-full flex-col items-center justify-center">
    <Tabs className="w-full ">

      <TabList >
        <Tab>Projects</Tab>
        <Tab>Education</Tab>
        <Tab>Experience</Tab>
        <Tab>Internship</Tab>
        <Tab>Hackathons</Tab>
        <Tab>Content</Tab>

      </TabList>


      <TabPanel>
        <Projects />
      </TabPanel>

      <TabPanel>
        <Educations />
      </TabPanel>

      <TabPanel>
        <Experience />
      </TabPanel>

      <TabPanel>
        <Internships />
      </TabPanel>

      <TabPanel>
        <Hackathons />
      </TabPanel>

      <TabPanel>
        <Contents />
      </TabPanel>
    </Tabs>
  </div>
);
}

// function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
//   const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

//   if (isThouchpad) {
//     ev.stopPropagation();
//     return;
//   }

//   if (ev.deltaY < 0) {
//     apiObj.scrollNext();
//   } else if (ev.deltaY > 0) {
//     apiObj.scrollPrev();
//   }
// }
