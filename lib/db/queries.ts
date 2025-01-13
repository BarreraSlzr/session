import { hash, genSalt } from 'bcrypt-ts';
import { db } from '.';
import { DocumentKind, MessageTable, Visibility } from './types';
import { Insertable } from 'kysely';

export async function getUser(email: string) {
  return await db.selectFrom('User').selectAll().where('email', '=', email).execute();
}

export async function createUser(email: string, password: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  return await db.insertInto('User').values({ email, password: hashedPassword }).returningAll().executeTakeFirstOrThrow();
}

export async function saveChat(chat: { id: string; userId: string; title: string }) {
  return await db.insertInto('Chat').values({
    id: chat.id,
    userId: chat.userId,
    title: chat.title
  }).returningAll().executeTakeFirstOrThrow();
}

export async function deleteChatById(id: string) {
  await db.deleteFrom('Vote').where('chatId', '=', id).execute();
  await db.deleteFrom('Message').where('chatId', '=', id).execute();
  return await db.deleteFrom('Chat').where('id', '=', id).execute();
}

export async function getChatsByUserId(userId: string) {
  return await db.selectFrom('Chat').selectAll().where('userId', '=', userId).orderBy('createdAt', 'desc').execute();
}

export async function getChatById(id: string) {
  return await db.selectFrom('Chat').selectAll().where('id', '=', id).executeTakeFirst();
}

export async function saveMessages(messages: Array<Insertable<MessageTable>>) {

  return await db.insertInto('Message').values(
    messages.map(m => ({
      ...m,
      content: typeof m.content === 'string' ? `"${m.content}"` : m.content
    })
    )).returningAll().execute();
}

export async function getMessagesByChatId(chatId: string) {
  return await db.selectFrom('Message').selectAll().where('chatId', '=', chatId).orderBy('createdAt', 'asc').execute();
}

export async function voteMessage(vote: { chatId: string; messageId: string; isUpvoted: boolean }) {
  const existingVote = await db
    .selectFrom('Vote')
    .selectAll()
    .where('messageId', '=', vote.messageId)
    .executeTakeFirst();

  if (existingVote) {
    return await db
      .updateTable('Vote')
      .set({ isUpvoted: vote.isUpvoted })
      .where('messageId', '=', vote.messageId)
      .returningAll().executeTakeFirstOrThrow();
  }

  return await db.insertInto('Vote').values(vote).returningAll().executeTakeFirstOrThrow();
}

export async function getVotesByChatId(chatId: string) {
  return await db.selectFrom('Vote').selectAll().where('chatId', '=', chatId).execute();
}

export async function saveDocument(document: { id: string; title: string; kind: DocumentKind; content: string; userId: string }) {
  return await db.insertInto('Document').values({ ...document }).returningAll().executeTakeFirstOrThrow();
}

export async function getDocumentsById(id: string) {
  return await db.selectFrom('Document').selectAll().where('id', '=', id).orderBy('createdAt', 'asc').execute();
}

export async function getDocumentById(id: string) {
  return await db.selectFrom('Document').selectAll().where('id', '=', id).orderBy('createdAt', 'desc').executeTakeFirst();
}

export async function deleteDocumentsByIdAfterTimestamp(id: string, timestamp: Date) {
  await db
    .deleteFrom('Suggestion')
    .where('documentId', '=', id)
    //.where('documentCreatedAt', '>', timestamp)
    .execute();

  return await db
    .deleteFrom('Document')
    .where('id', '=', id)
    .where('createdAt', '>', timestamp)
    .returningAll().executeTakeFirstOrThrow();
}

export async function saveSuggestions(
  suggestions: Array<{
    documentId: string;
    documentCreatedAt: Date;
    originalText: string;
    suggestedText: string;
    userId: string;
  }>
) {
  return await Promise.all(
    suggestions.map((suggestion) =>
      db
        .insertInto('Suggestion')
        .values({
          documentId: suggestion.documentId,
          documentCreatedAt: suggestion.documentCreatedAt,
          originalText: suggestion.originalText,
          suggestedText: suggestion.suggestedText,
          userId: suggestion.userId
        })
        .returningAll().executeTakeFirstOrThrow()
    )
  );
}

export async function getSuggestionsByDocumentId(documentId: string) {
  return await db.selectFrom('Suggestion').selectAll().where('documentId', '=', documentId).execute();
}

export async function getMessageById(id: string) {
  return await db.selectFrom('Message').selectAll().where('id', '=', id).executeTakeFirst();
}

export async function deleteMessagesByChatIdAfterTimestamp(chatId: string, timestamp: Date) {
  return await db.deleteFrom('Message').where('chatId', '=', chatId).where('createdAt', '>=', timestamp).execute();
}

export async function updateChatVisibilityById(chatId: string, visibility: Visibility) {
  return await db.updateTable('Chat').set({ visibility }).where('id', '=', chatId).returningAll().executeTakeFirstOrThrow();
}

export async function setupMfa(userId: string, secret: string) {
  return await db.insertInto('Mfa').values({ userId, secret }).returningAll().executeTakeFirstOrThrow();
}

export async function verifyMfa(userId: string, token: string) {
  return await db.selectFrom('Mfa').selectAll().where('userId', '=', userId).where('token', '=', token).executeTakeFirst();
}

export async function getUserByToken(token: string) {
  return await db.selectFrom('User').selectAll().where('token', '=', token).executeTakeFirst();
}

export async function updateUserVerificationStatus(userId: string, isVerified: boolean) {
  return await db.updateTable('User').set({ isVerified }).where('id', '=', userId).returningAll().executeTakeFirstOrThrow();
}

export async function updateUserPassword(userId: string, newPassword: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(newPassword, salt);
  return await db.updateTable('User').set({ password: hashedPassword }).where('id', '=', userId).returningAll().executeTakeFirstOrThrow();
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = (await db.selectFrom('Session').select('sessionToken').executeTakeFirst()).sessionToken;

  await db.insertInto('Session').values({
    userId,
    sessionToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 1 week expiration
  }).execute();

  return sessionToken;
}

export async function validateSession(sessionToken: string): Promise<boolean> {
  const session = await db.selectFrom('Session').selectAll().where('sessionToken', '=', sessionToken).executeTakeFirst();
  if (session && new Date(session.expiresAt) > new Date()) {
    return true;
  }
  return false;
}

export async function renewSession(sessionToken: string): Promise<string | null> {
  const session = await db.selectFrom('Session').selectAll().where('sessionToken', '=', sessionToken).executeTakeFirst();
  if (session) {
    const newSessionToken = (await db.selectFrom('Session').select('sessionToken').executeTakeFirst()).sessionToken;
    await db.updateTable('Session').set({
      sessionToken: newSessionToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 1 week expiration
    }).where('id', '=', session.id).execute();
    return newSessionToken;
  }
  return null;
}

export async function deleteSession(sessionToken: string): Promise<void> {
  await db.deleteFrom('Session').where('sessionToken', '=', sessionToken).execute();
}

export async function setupWebAuthn(userId: string, credential: any) {
  return await db.insertInto('WebAuthn').values({ userId, credential }).returningAll().executeTakeFirstOrThrow();
}

export async function getWebAuthnCredential(userId: string) {
  return await db.selectFrom('WebAuthn').selectAll().where('userId', '=', userId).executeTakeFirst();
}
