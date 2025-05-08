
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="h-8 w-8 border-4 border-joke-blue rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
