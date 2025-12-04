"use client";
import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Sign up successful!");
        setForm({ name: "", email: "", password: "" });
      } else {
        setMessage(data.message || "Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setMessage("Sign up failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input className="border p-2" type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input className="border p-2" type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input className="border p-2" type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpPage;