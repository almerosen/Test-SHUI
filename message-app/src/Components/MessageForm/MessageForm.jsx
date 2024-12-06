import { useState } from "react";
import { useNavigate } from "react-router";
import "./messageForm.css";

export const MessageForm = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const[messageCreated, setMessageCreated] = useState(false)
    const navigate = useNavigate();

    const submitForm =  async (event) => {
        event.preventDefault();

        console.log("Form data", { message, username })

        if (!message.trim()) {
            setError("Message cannot be empty")
            return;
        }

        if (!username.trim()) {
            setError("Username is required")
            return;
        }

        const response = await fetch("https://rcyguaq7ui.execute-api.eu-north-1.amazonaws.com/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message, username })
        })

        if (!response.ok) {
            throw new Error (`Error sending form data, status code: ${response.status}`)
        }

        const data = await response.json();
        console.log("retrieved data:", data)

        if (data.success) {
            console.log("Message posted successfully", data.data);
            setMessageCreated(true)
            setMessage("");
            setUsername("");
            setError("");

            setTimeout(() => {
                setMessageCreated(false)
            }, 3000);

        } else {
            console.log("Failed to post message", data.error);
            setError(data.error);
        }
    }

    return (
        <>
            <form className="message-form" onSubmit={submitForm}>
                    {messageCreated ? <p style={{ color: "white", textAlign: "center", marginTop: "5rem"}}>Message created!</p> :
                    <textarea 
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />}

                    {error && <p className="error-text">{error}</p>}

                    <input 
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <button className="submit-button" type="submit">Submit</button>

            </form> 
        </>
        
    )
}