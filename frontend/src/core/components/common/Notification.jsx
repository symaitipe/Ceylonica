import React, { forwardRef, useImperativeHandle, useState } from "react";
import "./Notification.css";

const Notification = forwardRef((_, ref) => {
  const [notification, setNotification] = useState(null);

  useImperativeHandle(ref, () => ({
    show: (message, type = "error") => {
      setNotification({ message, type });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    },
  }));

  return notification ? (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  ) : null;
});

export default Notification;
