import Profile from "@/components/profile";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { validateForm } from "@/validation/formValidation";

// Mock the validation module
jest.mock("@/validation/formValidation", () => ({
  validateForm: jest.fn()
}));

describe("Profile Component", () => {
  // Clear mock calls between tests
  beforeEach(() => {
    (validateForm as jest.Mock).mockReset();
  });

  test("renders Profile component correctly", () => {
    render(<Profile />);

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your password")).toBeInTheDocument();
  });

  test("updates input values on change", async () => {
    render(<Profile />);

    const nameInput = screen.getByPlaceholderText("Type your name");
    const emailInput = screen.getByPlaceholderText("Type your email");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
  });

  test("displays success message on valid form submission", async () => {
    // Mock successful validation
    (validateForm as jest.Mock).mockReturnValue({ isValid: true });
    
    render(<Profile />);

    const nameInput = screen.getByPlaceholderText("Type your name");
    const emailInput = screen.getByPlaceholderText("Type your email");
    const passwordInput = screen.getByPlaceholderText("Type your password");
    const submitButton = screen.getByText("Submit");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");

    fireEvent.click(submitButton);

    expect(await screen.findByText("Profile successfully created!")).toBeInTheDocument();
  });

  test('shows validation errors when fields are empty', async () => {
    // Mock validation failure with specific error messages
    (validateForm as jest.Mock).mockReturnValue({
      isValid: false,
      name: 'Name is required.',
      email: 'Email is required.',
      password: 'Password is required.',
      phone: ''
    });
    
    render(<Profile />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    // Wait for error messages and verify they appear
    await waitFor(() => {
      const nameErrorElement = screen.getByText('Name is required.');
      const emailErrorElement = screen.getByText('Email is required.');
      const passwordErrorElement = screen.getByText('Password is required.');
      
      expect(nameErrorElement).toBeInTheDocument();
      expect(emailErrorElement).toBeInTheDocument();
      expect(passwordErrorElement).toBeInTheDocument();
    });
  });

  test('clears errors when typing in fields', async () => {
    // First mock validation failure
    (validateForm as jest.Mock).mockReturnValue({
      isValid: false,
      name: 'Name is required.',
      email: 'Email is required.',
      password: 'Password is required.',
      phone: ''
    });
    
    render(<Profile />);
    
    // Submit to show errors
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    
    // Wait for errors to appear
    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument();
    });
    
    // Type in name field
    const nameInput = screen.getByPlaceholderText('Type your name');
    await userEvent.type(nameInput, 'J');
    
    // Verify error is cleared
    expect(screen.queryByText('Name is required.')).not.toBeInTheDocument();
  });
});