import CompanyInfo from "@/app/(internetfriends)/components/company-info";
import Header from "@/app/(internetfriends)/components/header";
import HeroText from "@/app/(internetfriends)/components/hero-text";
import Navigation from "@/app/(internetfriends)/components/navigation";
import SocialLinks from "@/app/(internetfriends)/components/social-links";
import content from '@/app/(internetfriends)/content.json';
import ProfileCard from "../components/profile/profile-card";


export default function Page() {
    return (
        <main>
            <Header />
            <HeroText className="min-h-fit">
                <h1 className="text-5xl font-bold sm:pb-6 pb-4 md:pb-8">
                    {content.curriculum.title}
                </h1>
                <div className="bg-foreground text-brand-blue-100">
                    <div className="sm:px-6 px-2 md:px-8 py-12 pt-6">
                        <ProfileCard />
                    </div>
                </div>
            </HeroText>
            <Navigation />
            <SocialLinks />
            <CompanyInfo />
        </main>
    );
}