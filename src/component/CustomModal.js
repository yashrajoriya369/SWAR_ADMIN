import React from "react";

export default function CustomModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-content">
          <svg
            className="modal-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              fillRule="evenodd"
            ></path>
          </svg>
          <h2 id="modal-title" className="modal-title">Are you sure?</h2>
          <p className="modal-text">
            Do you really want to continue? This process cannot be undone.
          </p>
        </div>
        <div className="modal-buttons">
          <button
            onClick={onClose}
            className="modal-cancel-btn"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="modal-confirm-btn"
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

