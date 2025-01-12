
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileExpertiseTab } from "./profile-expertise-tab";
import { ProfileSkillsTab } from "./profile-skills-tab";
import { ProfileProjectsTab } from "./profile-projects-tab";
import { ProfileMoreTab } from "./profile-more-tab";

export const ProfileTabs = () => {
    return (
        <Tabs defaultValue="expertise">
            <TabsList>
                <TabsTrigger className="data-[state=active]:bg-brand-blue-100" value="expertise">Work experience</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-brand-blue-100" value="projects">Projects</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-brand-blue-100" value="skills">Skills</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-brand-blue-100" value="me">More</TabsTrigger>
            </TabsList>
            <TabsContent value="expertise">
                <ProfileExpertiseTab />
            </TabsContent>
            <TabsContent value="projects">
                <ProfileProjectsTab />
            </TabsContent>
            <TabsContent value="skills">
                <ProfileSkillsTab />
            </TabsContent>
            <TabsContent value="me">
                <ProfileMoreTab />
            </TabsContent>
        </Tabs>
    );
};
