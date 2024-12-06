import "./Message.css";
import vector from "../../assets/vector.svg";

export const Message = ({message}) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('sv-SE', { 
            month: 'long',
            day: 'numeric',  
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <article className="message-container">
            <p id="date-text">{formatDate(message.createdAt)}</p>
            <p id="message-text">{message.message}</p>
            <p id="username"> - {message.username}</p>
            <div className="vector-container">
                <img src={vector} alt="vector" className="vector-img" />    
            </div> 
        </article>
    )
}