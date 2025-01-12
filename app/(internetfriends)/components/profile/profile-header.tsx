
import MotionDiv from "@/app/(internetfriends)/components/motion-div";
import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data";
import Link from "next/link";
import { cardCss } from "./profile-card";

export const ProfileHeader = () => {
    return (
        <MotionDiv className={`flex justify-between items-center mb-2 ${cardCss}`}>
            <h1 className="text-xl font-bold">{curriculum.professionalPosition}</h1>
            <Link href={'/contact'} className="bg-brand-blue-800 font-semibold px-4 py-2 rounded-md hover:bg-brand-blue-700">
                Hire me
            </Link>
        </MotionDiv>
    );
};
