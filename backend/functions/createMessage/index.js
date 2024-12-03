import { db } from "../../services/db.js";
import { v4 as uuidv4 } from 'uuid';


export const handler = async (event) => {
    console.log(event);

    try {
        const { username, message } = JSON.parse(event.body);

        if (!username || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ sucess: false, error: "Username and message are required" })
            }
        }
    
        const newMessage = {
            messageId: uuidv4(),
            username,
            message,
            createdAt: new Date().toISOString()
        }
    
        await db.put({
            TableName: "messagesTable",
            Item: newMessage,
        });
    
        return {
            statusCode: 201,
            body: JSON.stringify({ success: true, data: newMessage})
        }

    } catch (error) {
        console.error("Error creating message", error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error creating message" })
        }
    }  
}