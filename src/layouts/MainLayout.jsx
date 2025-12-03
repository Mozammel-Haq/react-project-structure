import { useUser } from "../contexts/UserContext";

function MainLayout() {
  const { user, logout } = useUser();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <p>Welcome, {user?.name}</p>

      <button onClick={logout} style={{ marginTop: "10px" }}>
        Logout
      </button>
    </div>
  );
}

export default MainLayout;
