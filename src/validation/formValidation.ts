import { FormErrors } from "@/interface/formErrors";


export const validateForm = (form: { name: string; email: string; phone: string; password: string }): FormErrors & { isValid: boolean } => {
    let isValid = true;
    const errors: FormErrors = { name: '', email: '', phone: '', password: '' };

    if (!form.name.trim()) {
        errors.name = "Name is required.";
        isValid = false;
    }

    if (!form.email.trim()) {
        errors.email = "Email is required.";
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = "Invalid email format.";
        isValid = false;
    }
    
    if (form.phone.trim() && !/^\d*$/.test(form.phone)) {
        errors.phone = "Only numbers are allowed"
    } else if (form.phone.trim() && !/^\d{10}$/.test(form.phone)) {
        errors.phone = "Phone number must be 10 digits.";
        isValid = false;
    }

    if (!form.password.trim()) {
        errors.password = "Password is required.";
        isValid = false;
    } else if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
        isValid = false;
    } else if (!/[A-Z]/.test(form.password)) {
        errors.password = "Password must contain at least one uppercase letter (A-Z).";
        isValid = false;
    } else if (!/[a-z]/.test(form.password)) {
        errors.password = "Password must contain at least one lowercase letter (a-z).";
        isValid = false;
    } else if (!/\d/.test(form.password)) {
        errors.password = "Password must include at least one numeric digit (0-9).";
        isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
        errors.password = "Include at least one special character (@, #, $, %, etc.).";
        isValid = false;
    }

    return { ...errors, isValid };
};
