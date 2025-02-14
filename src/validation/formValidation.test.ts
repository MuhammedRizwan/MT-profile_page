import { validateForm } from "./formValidation";


describe("validateForm", () => {
  it("should return no errors and isValid = true for valid input", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "Password@123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(true);
    expect(result.name).toBe("");
    expect(result.email).toBe("");
    expect(result.phone).toBe("");
    expect(result.password).toBe("");
  });

  it("should return an error for missing name", () => {
    const formData = {
      name: "",
      email: "john@example.com",
      phone: "1234567890",
      password: "Password@123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.name).toBe("Name is required.");
  });

  it("should return an error for invalid email format", () => {
    const formData = {
      name: "John Doe",
      email: "invalid-email",
      phone: "1234567890",
      password: "Password@123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.email).toBe("Invalid email format.");
  });

  test('should return an error if the phone number is not numeric', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: 'abc123', // Invalid phone number
      password: 'password123'
    };
    
    const result = validateForm(formData);
    
    expect(result.isValid).toBe(false);
    expect(result.phone).toBe('Only numbers are allowed');
  });

  it("should return an error if the phone number is not 10 digits", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "12345",
      password: "Password@123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.phone).toBe("Phone number must be 10 digits.");
  });

  it("should return an error for missing password", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.password).toBe("Password is required.");
  });

  it("should return an error for password less than 8 characters", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "Pass1!",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.password).toBe("Password must be at least 8 characters.");
  });

  it("should return an error if password does not contain an uppercase letter", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "password@123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.password).toBe("Password must contain at least one uppercase letter (A-Z).");
  });

  it("should return an error if password does not contain a lowercase letter", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "PASSWORD@123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.password).toBe("Password must contain at least one lowercase letter (a-z).");
  });

  it("should return an error if password does not contain a number", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "Password@!",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.password).toBe("Password must include at least one numeric digit (0-9).");
  });

  it("should return an error if password does not contain a special character", () => {
    const formData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      password: "Password123",
    };

    const result = validateForm(formData);

    expect(result.isValid).toBe(false);
    expect(result.password).toBe("Include at least one special character (@, #, $, %, etc.).");
  });
});
