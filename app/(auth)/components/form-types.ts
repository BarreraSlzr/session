interface IFormField {
  name: string
  label: string
  children: React.ReactNode
}

interface IAction {
  children: React.ReactNode
  handler: (formData: FormData, submitter: { id: string; name: string; value: string } | null) => void
}