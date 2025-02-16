import PropTypes from "prop-types";
import { useEffect } from "react";

const Notification = ({ message, dispatch }) => {
  useEffect(() => {
    if (message === null) return;

    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 1000);

    return () => clearTimeout(timer);
  }, [message]);

  if (message === null) return null;

  return (
    <div className={`notification notification--${message.type}`}>
      {message.text}
    </div>
  );
};
export default Notification;

Notification.propTypes = {
  message: PropTypes.object,
};
