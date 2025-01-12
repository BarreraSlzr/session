
import Head from "next/head";
import MotionDiv from "@/app/(internetfriends)/components/motion-div";
import { ProfileHeader } from "./profile-header";
import { ProfileInfo } from "./profile-info";
import { ProfileTabs } from "./profile-tabs";
import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data";
import content from '@/app/(internetfriends)/content.json'

export const cardCss = `sm:p-4 p-2 bg-brand-blue-900 rounded-sm`;

const ProfileCard = () => {
    return (
        <>
            <Head>
                <title>{`Hire ${curriculum.contactInfo.fullname} - ${curriculum.professionalPosition}`}</title>
                <meta
                    name="description"
                    content={`Learn more about ${curriculum.contactInfo.fullname}, a highly skilled ${curriculum.professionalPosition} with expertise in ${curriculum.skills.map((skill) => skill.name).join(", ")}.`}
                />
                <meta name="keywords" content={`Hire ${curriculum.contactInfo.fullname}, ${curriculum.professionalPosition}, ${curriculum.skills.map((skill) => skill.name).join(", ")}`} />
                <meta name="author" content={curriculum.contactInfo.fullname} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content={`Hire ${curriculum.contactInfo.fullname}`} />
                <meta
                    property="og:description"
                    content={`Explore ${curriculum.contactInfo.fullname}'s professional journey, skills, and expertise.`}
                />
                <meta property="og:image" content="https://github.com/BarreraSlzr.png" />
                <meta property="og:url" content={`https://${content.siteConfig.url}/profile`} />
                <meta property="og:type" content="profile" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`Hire ${curriculum.contactInfo.fullname}`} />
                <meta
                    name="twitter:description"
                    content={`Explore ${curriculum.contactInfo.fullname}'s professional experience and background.`}
                />
                <meta name="twitter:image" content="https://github.com/BarreraSlzr.png" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={`https://${content.siteConfig.url}/profile`} />
            </Head>
            <MotionDiv className="w-full max-w-3xl flex flex-col gap-2">
                <ProfileHeader />
                <ProfileInfo />
                <ProfileTabs />
            </MotionDiv>
        </>
    );
};

export default ProfileCard;
