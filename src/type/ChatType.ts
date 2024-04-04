export type ChatType = {
    id?: string,

    name: string,

    messages: MessageType[],
}

export type MessageType = {
    content: string,
    role: "user" | "assistant"
}