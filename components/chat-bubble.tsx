import { Button } from '@/components/ui/button'
import { LinkedInInfo } from '@/components/linkedin-info'

interface ChatBubbleProps {
  onClick: () => void
}

export function ChatBubble({ onClick }: ChatBubbleProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 left-4 z-50 rounded-full p-3 h-14 shadow-lg bg-[hsl(var(--sofia-primary))] hover:bg-[hsl(var(--sofia-primary)_/_0.9)] transition-colors"
    >
      <LinkedInInfo />
    </Button>
  )
}

