import React, { useState } from 'react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';

interface DeleteBeanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
  beanName: string;
}

const DeleteBeanModal: React.FC<DeleteBeanModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  beanName 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const success = await onConfirm();
      
      if (success) {
        onClose();
      } else {
        setError('Failed to delete bean. Please try again.');
      }
    } catch (err) {
      console.error('Error deleting bean:', err);
      setError('Failed to delete bean. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Coffee Bean">
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete <span className="font-semibold">{beanName}</span>?
          </p>
          <p className="text-gray-600 text-sm">
            This action cannot be undone.
          </p>
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isDeleting}
            className="border-amber-600 text-amber-700 hover:bg-amber-50"
          >
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBeanModal;
