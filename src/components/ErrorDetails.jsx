import React from "react";
import { useLocation } from "react-router-dom";

function ErrorDetails() {
  const { state } = useLocation();
  const { message, status, statusText } = state || {};

  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-4">⚠️ Error</h1>
      <p className="text-lg mb-2">
        {message || "An unexpected error occurred."}
      </p>
      {status && statusText && (
        <p className="text-gray-600">
          {status} - {statusText}
        </p>
      )}
    </div>
  );
}

export default ErrorDetails;
