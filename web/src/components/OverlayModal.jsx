// eslint-disable-next-line no-unused-vars
import React from 'react';
import './OverlayModal.css';

// eslint-disable-next-line react/prop-types
function OverlayModal({ children, close, modalRef, width }) {
  return (
    <div className="overlaymodal">
      <div
        className="overlaymodal-content"
        ref={modalRef}
        style={{ width: `${width}%` }}
      >
        <span className="overlayclose" onClick={close}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default OverlayModal;
