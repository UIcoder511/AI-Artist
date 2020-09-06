import React from 'react'

export default function SingleMessage({data,whoMessage}) {
    return (
        <div className="chat-message-list">
            <div className={"message-row "+whoMessage}>
                <div className="message-text">{data.message}</div>
                <div className="message-time">{data.time+" "+data.date}</div>
            </div>
        </div>
    )
}
