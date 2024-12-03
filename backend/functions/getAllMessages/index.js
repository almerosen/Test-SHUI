import { db } from "../../services/db.js";

export const handler = async (event) => {
    console.log(event) 

    try {
        const {Items} = await db.scan({
            TableName: "messagesTable",
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, data: Items })
        }

    } catch (error) {
        console.error("Error retrieving messages")
        return {
            statusCode: 500, 
            body: JSON.stringify({ success: false, message: error.message || "Error retrieving messages" })
        }
    }
}