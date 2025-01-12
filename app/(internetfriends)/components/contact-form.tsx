"use client"

import { ArrowUpRight } from 'lucide-react';
import { submitContactForm } from '@/app/(internetfriends)/actions/contact';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const START_DATE_OPTIONS = [
    'As soon as possible',
    'Within 1 month',
    'Within 3 months',
    'Within 6 months',
    'Not sure yet'
];

const BUDGET_OPTIONS = [
    '$1,000 - $4,999',
    '$5,000 - $9,999',
    '$10,000 - $19,999',
    '$20,000+'
];

export function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const searchParams = useSearchParams()

    async function handleSubmit(formData: FormData) {
        const result = await submitContactForm(formData);

        if (result.success) {
            formRef.current?.reset();
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label htmlFor="first_name" className="block text-sm font-medium">
                        First Name
                    </label>
                    <Input
                        type="text"
                        id="first_name"
                        name="first_name"
                        autoComplete="given-name"
                        required
                        defaultValue={searchParams.get('first_name') || ''}
                        className="bg-transparent border-b border-brand-blue-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="last_name" className="block text-sm font-medium">
                        Last Name
                    </label>
                    <Input
                        type="text"
                        id="last_name"
                        name="last_name"
                        autoComplete="family-name"
                        required
                        defaultValue={searchParams.get('last_name') || ''}
                        className="bg-transparent border-b border-brand-blue-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label htmlFor="company_name" className="block text-sm font-medium">
                        Company Name
                    </label>
                    <Input
                        type="text"
                        id="company_name"
                        name="company_name"
                        autoComplete="organization"
                        required
                        defaultValue={searchParams.get('company_name') || ''}
                        className="bg-transparent border-b border-brand-blue-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100"
                    />
                </div>
                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        defaultValue={searchParams.get('email') || ''}
                        className="bg-transparent border-b border-brand-blue-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label htmlFor="project_start_date" className="block text-sm font-medium">
                        Estimated Project Start Date
                    </label>
                    <Select
                        name="project_start_date"
                        aria-label="Estimated Project Start Date"
                        required
                        defaultValue={searchParams.get('project_start_date') || START_DATE_OPTIONS[0]}
                    >
                        <SelectTrigger className="bg-transparent border-b border-brand-blue-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {START_DATE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label htmlFor="budget" className="block text-sm font-medium">
                        Budget
                    </label>
                    <Select
                        name="budget"
                        aria-label="Budget"
                        required
                        defaultValue={searchParams.get('budget') || BUDGET_OPTIONS[1]}
                    >
                        <SelectTrigger className="bg-transparent border-b border-brand-blue-800 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {BUDGET_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-1">
                <label htmlFor="project_scope" className="block text-sm font-medium">
                    Brief description of your project scope
                </label>
                <Textarea
                    id="project_scope"
                    name="project_scope"
                    aria-label="Project Scope Description"
                    required
                    defaultValue={searchParams.get('project_scope') || ''}
                    rows={6}
                    maxLength={2000}
                    className="bg-transparent border border-brand-blue-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-brand-blue-100 resize-none rounded-none"
                    placeholder="Maximum of 2000 characters."
                />
            </div>
            <div className="flex justify-end">
                <Button
                    type="submit"
                    className="flex items-center gap-2 text-brand-blue-200 bg-foreground border-2 border-brand-blue-800 px-8 py-3 rounded-sm hover:opacity-90 transition-opacity"
                >
                    {`🎉 Let's make magic happen!`}
                    <ArrowUpRight className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}
