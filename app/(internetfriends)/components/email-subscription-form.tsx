'use client'

import { PropsWithChildren, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EmailSubscriptionForm({url, children}: PropsWithChildren<{url: string}>) {
    const [email, setEmail] = useState('')
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`${url}&email=${encodeURIComponent(email)}`)
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <div className="relative flex-grow">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pr-24 h-11 bg-amber-200/50 border-amber-300"
                />
                <Button type="submit"
                className="absolute right-1 top-1 px-6">{children}</Button>
            </div>
        </form>
    )
}
