'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import InputField from "./ui/input";
import { validateForm } from "@/validation/formValidation";
import { FormValues } from "@/interface/formvalue";
import { FormErrors } from "@/interface/formErrors";

export default function Profile() {
    // Manage form state inside the component
    const [form, setForm] = useState<FormValues>({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    // Manage error state
    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    // Success message state
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    /**
     * Handles form field changes and updates state.
     * @param {ChangeEvent<HTMLInputElement>} e - Input change event.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        // Clear error when user starts typing
        setErrors({ ...errors, [e.target.name]: '' });
    };

    /**
     * Validates and submits the form.
     * @param {FormEvent} e - Form submit event.
     */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationResults = validateForm(form);

        if (validationResults.isValid) {
            setForm({ name: '', email: '', phone: '', password: '' }); // Clear form
            setSuccessMessage("Profile successfully created!"); // Show success message

            setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 sec
        } else {
            setErrors(validationResults); // Show validation errors
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-black border border-slate-400 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-slate-300 text-2xl font-semibold text-center mb-6">
                    Profile
                </h1>

                {/* Success Message */}
                <p className="text-green-400 text-center min-h-[20px]">
                    {successMessage ? successMessage : " "}
                </p>

                <form onSubmit={handleSubmit} className="space-y-1">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        placeholder="Type your name"
                        value={form.name}
                        onChange={handleChange}
                        error={errors.name}
                    />

                    <InputField
                        label="Email"
                        type="text"
                        name="email"
                        placeholder="Type your email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <InputField
                        label="Phone (optional)"
                        type="text"
                        name="phone"
                        placeholder="Type your phone"
                        value={form.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />

                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Type your password"
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <button
                        type="submit"
                        className="mt-4 w-full bg-slate-200 text-black font-semibold py-2 rounded-md hover:bg-slate-500 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
