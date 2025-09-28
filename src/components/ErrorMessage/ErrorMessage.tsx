import React from "react";
import "./ErrorMessage.css";

type ErrorMessageProps = {
  children: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <div className="error-message">
    <div className="error-message__icon" />
    <div className="error-message__content">{children}</div>
  </div>
);

export default ErrorMessage;
