'use client'

import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AutoResizeTextarea } from '@/components/autoresize-textarea'

export function ChatForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { messages, input, setInput, append } = useChat({
    api: '/api/chat',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void append({ content: input, role: 'user' })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const messageList = (
    <div className="flex flex-col gap-4 overflow-y-auto px-4">
      {messages.map((message, index) => (
        <div
          key={index}
          data-role={message.role}
          className="max-w-[80%] rounded-xl px-3 py-2 text-sm data-[role=assistant]:self-start data-[role=user]:self-end data-[role=assistant]:bg-[hsl(var(--sofia-accent))] data-[role=user]:bg-[hsl(var(--sofia-primary))] data-[role=assistant]:text-black data-[role=user]:text-white"
        >
          {message.content}
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={cn('flex flex-col', className)}
      {...props}
    >
      <div className="flex-1 overflow-y-auto">
        {messageList}
      </div>
      <form
        onSubmit={handleSubmit}
        className="border-input bg-[hsl(var(--sofia-surface))] focus-within:ring-[hsl(var(--sofia-primary)_/_0.1)] relative mt-4 flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
        >
        <AutoResizeTextarea
          onKeyDown={handleKeyDown}
          onChange={v => setInput(v)}
          value={input}
          placeholder="Enter a message"
          className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute bottom-1 right-1 size-6 rounded-full hover:bg-[hsl(var(--sofia-primary)_/_0.1)]"
            >
              <ArrowUpIcon size={16} className="text-[hsl(var(--sofia-primary))]" />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={12}>Submit</TooltipContent>
        </Tooltip>
      </form>
    </div>
  )
}