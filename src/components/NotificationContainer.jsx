import { useNotification } from "../contexts/NotificationContext";

export default function NotificationContainer() {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`
            px-4 py-2 rounded-lg shadow-lg border 
            animate-slide-in
            ${n.type === "success" ? "bg-green-500 text-white border-green-600" : ""}
            ${n.type === "error" ? "bg-red-500 text-white border-red-600" : ""}
          `}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
