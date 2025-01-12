import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data";
import { Badge } from "@/components/ui/badge";
import { cardCss } from "./profile-card";

export const ProfileExpertiseTab = () => {
    return (
        <div className="flex flex-col gap-2">
            {curriculum.jobExperiences.map((job, index) => (
                <div key={`experience-${index}`} className={cardCss}>
                    <div className="flex flex-row flex-wrap justify-between">
                        <p className="font-medium">{job.title} | {job.razonSocial}</p>
                        <Badge variant='outline' className="text-gray-700 hover:bg-gray-300 text-sm font-semibold mr-2 px-2.5 py-0.5">
                            {job.startDate} - {job.endDate || "Present"}
                        </Badge>
                    </div>
                    <p className="text-black">{job.description}</p>
                </div>
            ))}
        </div>
    );
};
