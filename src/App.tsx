import React, { useEffect, useState } from 'react'
import { ChatContext } from './service/ChatContext'
import { ChatType } from './type/ChatType'

import { v4 } from 'uuid';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import ChatInstance from './components/ChatInstance';

function App() {
  const savedChats = JSON.parse(
    localStorage.getItem('chats') ?? "[]"
  )

  const [chats, setChats] = useState<ChatType[]>(savedChats)

  const getChatById = (id: string) => {
    return chats.find(el => el.id == id) ?? null
  }

  const getChats = () => {
    return chats;
  }

  const createChat = (chat: ChatType) => {
    const newChat = {
      ...chat,
      id: v4()
    }

    setChats([
      ...chats,
      newChat
    ])

    return newChat;
  }

  const updateChat = (chat: ChatType) => {
    setChats(chats.map((el) => {
      if (el.id == chat.id)
      {
        return chat
      }

      return el;
    }))
  }

  const deleteChat = (id: string): ChatType[] => {
    setChats(chats.filter(el => el.id !== id))
    return chats
  }

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  })

  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <Home />
      )
    },
    {
      path: '/:chatId',
      element: (
        <ChatInstance />
      )
    }
  ])


  return (
    <ChatContext.Provider value={{
      data: chats,
      getChatById,
      getChats,
      createChat,
      updateChat,
      deleteChat
    }}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm,
      }}>
        <RouterProvider router={routes} />
      </ConfigProvider>
    </ChatContext.Provider>
  )
}

export default App
