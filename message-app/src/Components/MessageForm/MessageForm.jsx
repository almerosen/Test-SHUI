import { useState } from "react";
import "./messageForm.css";

export const MessageForm = () => {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

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

        const result = await response.json();
        console.log("retrieved data:", result)

        if (response.ok) {
            console.log("Message posted successfully", result.data);
            setMessage("");
            setUsername("");
        } else {
            console.log("Failed to post message", result.error);
            setError(result.error);
        }
    }

    return (
        <>
            <form className="message-form" onSubmit={submitForm}>

                    <textarea 
                        id="message"
                        name="message"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

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