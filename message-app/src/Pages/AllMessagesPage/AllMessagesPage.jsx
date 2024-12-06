import { useEffect, useState } from "react";
import "./AllMessagesPage.css";
import logo from "../../assets/logo.svg";
import pencil from "../../assets/pencil.svg";
import { Message } from "../../Components/Message/Message";
import { Link } from "react-router";

export const AllMessagesPage = () => {
    const [messages, setMessages] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("https://rcyguaq7ui.execute-api.eu-north-1.amazonaws.com/messages");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Retrieved data:", data)

                if (data.success) {
                    setMessages(data.messages);
                } else {
                    setError(data.message || "An error occurred while fetching messages.");
                }
            } catch (error) {
                console.error("Error retrieving messages:", error);
                setError("Failed to retrieve messages. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const messagesSortedByDate = [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const messagesComponents = messagesSortedByDate.map((message) => {
        return <Message message={message} key={message.messageId}/>
    })


    return (
        <div className="allMessagesPage">
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo" />
            </div>

            { loading && <p style={{ color: "white", textAlign: "center" }}>Loading...</p> }
            { error && <p style={{ color: "red", textAlign: "center" }}>{error}</p> }
            { messages.length === 0 && !error && !loading && <p style={{ color: "white", textAlign: "center" }}>You have no messages to display</p> }
            { messages.length > 0 && (
                <section>
                    {messagesComponents}   
                </section>   
            )}
            <div className="pencilImg-container">
                <Link to="/message" aria-label="post a new message">
                    <img src={pencil} alt="pencil" className="pencil-img" />
                </Link>
            </div>
        </div>
    )
}