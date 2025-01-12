import { generateUUID } from '@/lib/utils'
import { cookies } from 'next/headers'
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models'
import { ChatEmbbed } from '@/components/chat-embbed';
import { Chat } from '@/components/chat';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('model-id')?.value;

  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ||
    DEFAULT_MODEL_NAME;
  return (
    <div className="relative min-h-screen">
      {/* Background iframe */}
      <iframe
        src="https://www.sofiasalud.com"
        className="absolute inset-0 w-full h-full border-0"
        title="Sofia Salud Website"
      />

      {/* Overlay to ensure chat components are clickable */}
      <div className="relative z-10">
        <ChatEmbbed >
          <Chat
            key={id}
            id={id}
            initialMessages={[]}
            selectedModelId={selectedModelId}
            selectedVisibilityType="private"
            isReadonly={false}
          />
          <DataStreamHandler id={id} />
        </ChatEmbbed>
      </div>
    </div>
  )
}