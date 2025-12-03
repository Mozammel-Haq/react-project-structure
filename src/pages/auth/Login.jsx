import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";

function Login() {
  const [user, setUser] = useState({
    email:"",
    password:""
  });
  const { login } = useUser();
  const {notify} = useNotification()
  const navigate = useNavigate();

  const handleChange=(e)=>{
    const {name, value} = e.target;
    setUser((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  function handleSubmit(e) {
    e.preventDefault();
    try{
          login(user.email, user.password);
      notify.success("Login Successful!")
        navigate("/dashboard");
    }catch{ 
    notify.error("Something went wrong!");
    }

  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>Email:</label> <br />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label> <br />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
