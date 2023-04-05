const Notification = ({ message1, message2 }) => {
  if (message1) {
    return <div className='success'>{message1}</div>;
  }
  if (message2) {
    return <div className='fail'>{message2}</div>;
  } else {
    return null;
  }
};

export default Notification;
