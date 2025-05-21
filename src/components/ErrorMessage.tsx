import React from 'react';

interface ErrorMessageProps {
  message: string;
  retryAction?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  retryAction,
}) => {
  return (
    <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
      <p className="text-red-600">{message}</p>
      {retryAction && (
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={retryAction}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
