function ErrorMessage({ message }) {
  return (
    <div className="error-message" role="alert">
      <span>⚠️</span>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
