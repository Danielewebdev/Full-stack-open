type NotificationProps = {
  notification: {
    message: string | null;
    type: "success" | "error";
  } | null;
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  if (!notification || notification.message === null) {
    return null;
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  );
};

export default Notification;
