import "./postMessagePage.css"
import { MessageForm } from "../../Components/MessageForm/messageForm"
import logo from "../../assets/logo.svg";

export const PostMessagePage = () => {
    return (
        <div className="postMessagePage">
            <div className="logo-container">
                <img src={logo} className="logo-img" alt="logo"/>
            </div>
            <MessageForm />
        </div>
    )
}