import { useState } from "react";

export function useSimpleForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const reset = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    console.log("제출 데이터: ", form);
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    reset,
  };
}
