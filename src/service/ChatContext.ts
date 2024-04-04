import { createContext } from "react";
import { ChatType } from "../type/ChatType";


export const ChatContext = createContext<{
    data: ChatType[],
    getChatById: (id: string) => ChatType | null
    getChats: () => ChatType[],
    createChat: (chat: ChatType) => ChatType,
    updateChat: (chat: ChatType) => void,
    deleteChat: (id: string) => ChatType[],
}|null>(null)