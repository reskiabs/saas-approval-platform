import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Login from "../components/LoginForm";

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
    const user = userEvent.setup();
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await user.click(submitButton);

    expect(
      await screen.findByText(/username is required/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });

  it("should mark inputs as invalid when validation fails", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await user.click(submitButton);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toHaveAttribute("aria-invalid", "true");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
  });

  it("should link error message with input via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await user.click(submitButton);

    const usernameInput = screen.getByLabelText(/username/i);

    expect(usernameInput).toHaveAttribute("aria-describedby", "usernameError");
  });

  it("should show error when username is not alphanumeric", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(usernameInput, "user@123");
    await user.type(passwordInput, "123456");

    await user.click(submitButton);

    expect(
      await screen.findByText(/username must be alphanumeric/i),
    ).toBeInTheDocument();
  });

  it("should show error when password less than 6 characters", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(usernameInput, "user123");
    await user.type(passwordInput, "123");

    await user.click(submitButton);

    expect(
      await screen.findByText(/minimum 6 characters/i),
    ).toBeInTheDocument();
  });

  it("should submit form and redirect on valid input", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(usernameInput, "user123");
    await user.type(passwordInput, "123456");

    await user.click(submitButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
