// src/components/ConfirmDeleteModal.js
import React from 'react';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-delete-modal overlay">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this user?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
