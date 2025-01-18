"use client"

import React from "react"

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => void
  children?: React.ReactNode
}

export function Form({ onSubmit, children }: Props) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    onSubmit(event, formData, submitter.id);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-16">
      {children}
    </form>
  )
}
