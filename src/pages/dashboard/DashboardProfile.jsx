import { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useNotification } from "../../contexts/NotificationContext";

function Profile() {
  const { user, login } = useUser(); 
  const { notify } = useNotification();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Load current user info on mount
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate async save
    setTimeout(() => {
      const updatedUser = { ...user, name, email };
      login(updatedUser.email, ""); 
      localStorage.setItem("skillsphere-user", JSON.stringify(updatedUser));
      notify.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Your Profile
      </h2>

      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            required
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            required
          />
          <Button type="submit" variant="primary" loading={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
