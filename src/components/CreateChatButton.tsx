import React, { useContext, useState } from 'react'
import { ChatContext } from '../service/ChatContext'
import { Button, Input, Modal } from 'antd'

function CreateChatButton() {
    const chats = useContext(ChatContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [newChatName, setNewChatName] = useState("")

    const handleOk = () => {
        chats?.createChat({
            name: newChatName,
            messages: [],
        })

        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setNewChatName("")
    }

    return (
        <>
            <Modal title="Create new chat" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder='Chat name' onChange={(e) => setNewChatName(e.target.value)} />
            </Modal>

            <Button onClick={() => setIsModalOpen(true)}>
                Create new 
            </Button>
        </>
    )
}

export default CreateChatButton
