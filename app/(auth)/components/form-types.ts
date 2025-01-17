interface IFormField {
  name: string
  label: string
  children: React.ReactNode
}

interface IAction {
  children: React.ReactNode
  onSubmit: (event: React.FormEvent<HTMLFormElement>, formData: FormData, submitterId: string) => void
}
