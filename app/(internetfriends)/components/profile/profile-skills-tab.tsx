import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data";
import { Badge } from "@/components/ui/badge";
import { cardCss } from "./profile-card";

export const ProfileSkillsTab = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className={cardCss}>
                <p className="font-medium">Skills & Aptitudes</p>
            </div>
            <div className={`${cardCss} flex flex-row flex-wrap gap-2`}>
                {curriculum.skills.sort((a, b) => b.popularity - a.popularity).map((skill, index) => (
                    <Badge key={`skill-${index}`} className="bg-brand-blue-100 text-brand-blue-800 hover:text-blue-100">
                        {skill?.name}
                    </Badge>
                ))}
            </div>
        </div>
    );
};
