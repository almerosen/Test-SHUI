import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";
import { MessageForm } from "./messageForm";
import { MemoryRouter } from "react-router";

describe("Create message", () => {

    it("should create a message successfully and display message created", async () => {

        render(
            <MemoryRouter>
                <MessageForm />
            </MemoryRouter>
        )

        const messageInput = screen.getByPlaceholderText(/Enter your message/i);
        const usernameInput = screen.getByPlaceholderText(/username/i);
        const submitButton = screen.getByText(/Submit/i);

        fireEvent.change(messageInput, { target: { value: "Test message"}});
        fireEvent.change(usernameInput, { target: { value: "Kalle"}});

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/message created!/i)).toBeInTheDocument();
        });
        
    })
})