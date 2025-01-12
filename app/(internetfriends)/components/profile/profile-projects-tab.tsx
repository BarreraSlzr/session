import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data";
import { Badge } from "@/components/ui/badge";
import { cardCss } from "./profile-card";

export const ProfileProjectsTab = () => {
    const skillsMap = new Map(curriculum.skills.map(skill => [skill.id, skill]));
    const renderSkills = (skillsUsed: number[]) => {
        const sortedSkills = skillsUsed
            .map(id => skillsMap.get(id))
            .filter(skill => skill)
            .sort((a, b) => (b?.popularity || 0) - (a?.popularity || 0));

        return sortedSkills.map(skill => (
            <Badge key={skill?.id} className="bg-brand-blue-100 text-brand-blue-800 hover:text-blue-100">
                {skill?.name}
            </Badge>
        ));
    };
    return (
        <div className="flex flex-col gap-2">
            <div className={cardCss}>
                <p className="font-medium">Enterprise projects</p>
            </div>
            {curriculum.jobExperiences.map((job, index) => (
                <div key={`project-${index}`} className={cardCss}>
                    <div className="flex flex-row flex-wrap justify-between">
                        <p className="font-medium">{job.title} | {job.razonSocial}</p>
                        <Badge variant={'outline'} className="text-gray-700 hover:bg-gray-300 text-sm font-semibold mr-2 px-2.5 py-0.5">
                            {job.startDate} - {job.endDate || "Present"}
                        </Badge>
                    </div>
                    {job.projects.map((project, pIndex) => (
                        <div key={`project-${pIndex}`} className="ml-4 mb-4">
                            <h4 className="text-lg font-semibold">{project.name}</h4>
                            <p className="text-gray-700 mb-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2">{renderSkills(project.skillsUsed)}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
