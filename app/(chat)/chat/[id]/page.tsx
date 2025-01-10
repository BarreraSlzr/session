import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat } from '@/components/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries';
import { convertToUIMessages } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { ChatEmbbed } from '@/components/chat-embbed';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById(id);

  if (!chat) {
    notFound();
  }

  const session = await auth();

  if (chat.visibility === 'private') {
    if (!session || !session.user) {
      return notFound();
    }

    if (session.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId(id);

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
        <ChatEmbbed chatVisible>
          <Chat
            id={chat.id}
            initialMessages={convertToUIMessages(messagesFromDb)}
            selectedModelId={selectedModelId}
            selectedVisibilityType={chat.visibility}
            isReadonly={session?.user?.id !== chat.userId}
          />
          <DataStreamHandler id={id} />
        </ChatEmbbed>
      </div>
    </div>
  )
}
