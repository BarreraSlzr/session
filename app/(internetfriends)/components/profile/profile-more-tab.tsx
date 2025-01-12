import React from "react";
import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cardCss } from "./profile-card";

export const ProfileMoreTab = () => {
    const moreInfo = [
        { label: "Height", value: curriculum.contactInfo.height || "N/A" },
        { label: "Sex", value: curriculum.contactInfo.sex || "N/A" },
        { label: "Nationality", value: curriculum.contactInfo.nationality || "N/A" },
        { label: "Location", value: curriculum.contactInfo.location || "N/A" },
        { label: "Contact", value: curriculum.contactInfo.email, isLink: true },
    ];

    return (
        <div className="grid grid-cols-2 gap-2">
            {moreInfo.map((info, index) => (
                <div key={index} className={cardCss}>
                    <p className="font-medium">{info.label}</p>
                    {info.isLink ? (
                        <Link
                            title={`Send email to ${info.value}`}
                            href={`mailto:${info.value}`}
                            className="flex space-x-2"
                        >
                            {info.value}
                            <ArrowUpRight className="size-4" />
                        </Link>
                    ) : (
                        <p className="text-black">{info.value}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfileMoreTab;
