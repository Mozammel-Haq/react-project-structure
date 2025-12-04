import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

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
    <>
      <div  className="w-screen flex items-center justify-center h-screen">
              <Card className="min-w-96">
              <div>
      <h1 className="text-center text-lg font-bold mb-4">Login</h1>
      <hr className="h-0.5 w-full mb-4 text-neutral-600" />
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div className="my-4">
        <Input
        label='Email:'
        value={user.email}
        name="email"
        onChange={handleChange}
        placeholder="Enter your email"
        required
        />
        </div>
        <div className="my-4">
        <Input
        label='Password:'
        value={user.password}
        type="password"
        passwordToggle={true}
        name="password"
        onChange={handleChange}
        placeholder="Your password"
        required
        />
        </div>
      
        <Button variant="primary" type="submit" className="mt-2">
          Login
        </Button>
      </form>
    </div>
      </Card>
      </div>



    </>

  );
}

export default Login;
