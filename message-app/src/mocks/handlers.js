import { http, HttpResponse } from "msw";

const messages = [
        {
            createdAt: "2024-12-03T12:49:24.588Z",
            message: "Undvik Kungsträdgården, där är det massa elakingar. Ta istället den lila linjen ut mot Pluppeberg.",
            messageId: "1e6305af-25b4-430e-88ab-e42d82210c1c",
            username: "Toffeln"
        },
        {
            createdAt: "2024-12-02T19:22:45.393Z",
            message: "Jag måste köpa mer kaffe",
            messageId: "d546a12c-ea99-45d1-b548-4fe8d3d6e465",
            username: "kalle"
        }
    ]


export const handlers = [
    http.get("https://rcyguaq7ui.execute-api.eu-north-1.amazonaws.com/messages", ({ request }) => {
        console.log("request:", request)
        // const url = new URL(request.url);
        // const emptyResponse = url.searchParams.get("empty");

        // if (emptyResponse === "true") {
        //     return HttpResponse.json({ success: true, messages: [] });
        // }
        
        return HttpResponse.json({ success: true, messages })
    }),

    http.post("https://rcyguaq7ui.execute-api.eu-north-1.amazonaws.com/messages", async ({ request }) => {
        console.log("Post request object:", request);
        const { message, username } =  await request.json();

        console.log(message, username);

        if (!message || !username) {
            return HttpResponse.json({ success: false, error: "Username and message are required" });
        }

        return HttpResponse.json({ success: true, message: "Message created" });
    })
]