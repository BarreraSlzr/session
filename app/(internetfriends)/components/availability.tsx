import { curriculum } from "@/app/(internetfriends)/lib/curriculum/data"

export const Availability = ({className = ''}: {className?: string}) => {
    return (
        <div className={`inline-flex gap-2 items-center ${className}`.trim()}>
            <span className="relative flex size-3">
                <span className="bg-yellow-500 animate-ping absolute inline-flex size-full rounded-full opacity-75"/>
                <span className="bg-yellow-500 relative inline-flex rounded-full size-3"/>
            </span>
            <p className="opacity-50 font-medium">{curriculum.contactInfo.availability}</p>
        </div>
    )
}