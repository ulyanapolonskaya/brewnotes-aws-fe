import React from 'react';

interface NoDataStateProps {
  message: string;
  buttonText?: string;
  onAction?: () => void;
}

const NoDataState: React.FC<NoDataStateProps> = ({
  message,
  buttonText = "Add New",
  onAction,
}) => {
  return (
    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 text-center">
      <p className="text-brown-600">{message}</p>
      {onAction && (
        <button
          className="mt-4 bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
          onClick={onAction}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default NoDataState;
