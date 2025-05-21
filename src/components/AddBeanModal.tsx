import React, { useState } from 'react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import axios from 'axios';

interface AddBeanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBeanAdded: () => void;
}

const BASE_API_URL = import.meta.env.VITE_API_URL;

const AddBeanModal: React.FC<AddBeanModalProps> = ({ isOpen, onClose, onBeanAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Bean name is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await axios.post(`${BASE_API_URL}/coffee-beans`, {
        name,
        description,
        rating: rating !== '' ? Number(rating) : null,
      });
      
      // Reset form
      setName('');
      setDescription('');
      setRating('');
      
      // Close modal and refresh beans list
      onBeanAdded();
      onClose();
    } catch (err) {
      console.error('Error adding bean:', err);
      setError('Failed to add bean. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Coffee Bean">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Bean Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="e.g. Ethiopian Yirgacheffe"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Describe the flavor profile, origin, etc."
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || (Number(val) >= 1 && Number(val) <= 5)) {
                setRating(val === '' ? '' : Number(val));
              }
            }}
            min="1"
            max="5"
            step="0.1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Rate from 1 to 5"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Bean'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBeanModal;
