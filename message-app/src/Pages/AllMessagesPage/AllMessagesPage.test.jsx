import { getByRole, render, screen, waitFor } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { AllMessagesPage } from "./AllMessagesPage";
import { MemoryRouter } from "react-router";

describe("App", () => {
    it("should fetch and display messages", async () => {
        render(
            <MemoryRouter>
                <AllMessagesPage />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());

        // expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Undvik Kungsträdgården, där är det massa elakingar. Ta istället den lila linjen ut mot Pluppeberg./)).toBeInTheDocument();
            expect(screen.getByText(/Toffeln/)).toBeInTheDocument();

            expect(screen.getByText(/Jag måste köpa mer kaffe/)).toBeInTheDocument();
            expect(screen.getByText(/kalle/)).toBeInTheDocument();
        });

        screen.debug();
    });

    it("should include a link element with href /message", () => {
        render(
            <MemoryRouter>
                <AllMessagesPage />
            </MemoryRouter>
        )

        const linkElement = screen.getByRole("link", { name : /post a new message/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/message");

    }),

    it("should display the messages sorted by latest first", async () => {
        render(
            <MemoryRouter>
                <AllMessagesPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            const displayedMessages = screen.getAllByRole("article");
            const displayedText = displayedMessages.map((message) => message.textContent);
            console.log("Displayed test:", displayedText);
            
            expect(displayedText).toEqual([
                '3 december kl. 13:49Undvik Kungsträdgården, där är det massa elakingar. Ta istället den lila linjen ut mot Pluppeberg. - Toffeln',
                '2 december kl. 20:22Jag måste köpa mer kaffe - kalle',
            ]);
        });
    })

    // it("should display a message when no posts exist", async () => {
    //     render(
    //         <MemoryRouter initialEntries={["/messages?empty=true"]}>
    //             <AllMessagesPage />
    //         </MemoryRouter>
    //     );

    //     const response = await fetch("https://rcyguaq7ui.execute-api.eu-north-1.amazonaws.com/messages?empty=true");
    //     const data = await response.json();
        
    //     expect(data.success).toBe(true);
    //     expect(data.messages).toEqual([]);  // Empty messages array
    //     expect("You have no messages to display").toBe("You have no messages to display");

    //     // expect(screen.getByText("Loading...")).toBeInTheDocument();

    //     // await waitFor(() => {
    //     //     expect(screen.getByText("You have no messages to display"));
    //     // });
    // })
});
