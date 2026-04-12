import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "../components/ui/Login";

// mock next/navigation
const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Login Component", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("should render form fields", () => {
    render(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should show validation errors when fields are empty", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/username is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });

  it("should show error when username is not alphanumeric", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "user@123" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/username must be alphanumeric/i),
    ).toBeInTheDocument();
  });

  it("should show error when password less than 6 characters", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "user123" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/minimum 6 characters/i),
    ).toBeInTheDocument();
  });

  it("should submit form and redirect on valid input", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "user123" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
