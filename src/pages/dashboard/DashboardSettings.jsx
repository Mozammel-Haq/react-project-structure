import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { useNotification } from "../../contexts/NotificationContext";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { notify } = useNotification();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      notify.success("Settings saved successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Settings
      </h2>

      {/* Theme Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Appearance
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </Button>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Notifications
        </h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">SMS Notifications</span>
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="h-5 w-5"
            />
          </label>
        </div>
      </Card>

      <Button variant="primary" onClick={handleSave} loading={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}

export default Settings;
