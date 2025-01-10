import { CoreMessage, UserContent } from "ai";
import { ColumnType, Generated, Selectable } from "kysely";

interface BaseTable {
    id: Generated<string>
    // You can specify a different type for each operation (select, insert and
    // update) using the `ColumnType<SelectType, InsertType, UpdateType>`
    // wrapper. Here we define a column `createdAt` that is selected as
    // a `Date`, can optionally be provided as a `string` in inserts and
    // can never be updated:
    createdAt: ColumnType<Date, string | undefined, never>
    //deleted: ColumnType<Date, string | undefined, never>
    //updated: ColumnType<Date, string | undefined, never>
}

export interface UserTable extends BaseTable {
    email: string;
    password?: string;
}
export type User = Selectable<UserTable>;

export type Visibility = 'public' | 'private';
export interface ChatTable extends BaseTable {
    title: string;
    userId: string; // UUID
    visibility: ColumnType<Visibility, Visibility | undefined, Visibility | undefined>
}
export type Chat = Selectable<ChatTable>;

export interface MessageTable extends BaseTable {
    chatId: string; // UUID
    role: CoreMessage['role'] ;
    content: CoreMessage['content']; // JSON
}
export type Message = Selectable<MessageTable>

export interface VoteTable {
    chatId: string; // UUID
    messageId: string; // UUID
    isUpvoted: boolean;
}
export type Vote = Selectable<VoteTable>

export type DocumentKind = 'text' | 'code';
export interface DocumentTable extends BaseTable {
    title: string;
    content?: string;
    kind: DocumentKind;
    userId: string; // UUID
}
export type Document = Selectable<DocumentTable>;

export interface SuggestionTable extends BaseTable {
    documentId: string; // UUID
    documentCreatedAt: Date;
    originalText: string;
    suggestedText: string;
    description?: string;
    isResolved?: ColumnType<boolean, boolean | undefined, boolean>
    userId: string; // UUID
}
export type Suggestion = Selectable<SuggestionTable>;

export interface Database {
    User: UserTable;
    Chat: ChatTable;
    Message: MessageTable;
    Vote: VoteTable;
    Document: DocumentTable;
    Suggestion: SuggestionTable;
}
