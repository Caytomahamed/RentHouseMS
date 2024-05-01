import React, { useState, useEffect, useRef } from 'react';
import './Alert.css'; // Import your CSS file

// eslint-disable-next-line react/prop-types
const Alert = ({ children, onClose, type = 'success', id }) => {
  const [isVisible, setIsVisible] = useState(true);
  const alertHeightRef = useRef(null); // useRef for alert height

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose(id);
      }
    }, 5000); // 5 seconds in milliseconds

    return () => clearTimeout(timerId); // Cleanup function to clear timeout on unmount
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    if (alertHeightRef.current) {
      const totalAlerts = document.querySelectorAll('.alert-container').length;
      const topPosition =
        (totalAlerts - 1) * alertHeightRef.current.offsetHeight + 'px';
      alertHeightRef.current.style.top = topPosition;
    }
  }, [isVisible]); // Recalculate top position on visibility change

  const color = type === 'success' ? '#7ed56fd9' : '#c2410c';

  return (
    isVisible && (
      <div
        className="alert-container"
        ref={alertHeightRef} // Store height reference
        key={id}
        style={{
          borderBottom: `5px solid ${color}`,
        }}
      >
        <div className="alert">{children}</div>
      </div>
    )
  );
};

export default Alert;
