import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useUser();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      notify.success("Login successful");
      navigate("/dashboard/home");
    } catch (err) {
      console.error("Login failed:", err?.response?.data || err.message);
      const message = err?.response?.data?.message || "Invalid credentials";
      notify.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center h-screen">
      <Card className="min-w-96">
        <div>
          <h1 className="text-center text-lg font-bold mb-4">Login</h1>
          <hr className="h-0.5 w-full mb-4 text-neutral-600" />
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <Input
              label="Email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              value={form.password}
              type="password"
              passwordToggle
              name="password"
              onChange={handleChange}
              placeholder="Your password"
              required
            />
            <Button variant="primary" type="submit" loading={loading}>
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Login;
