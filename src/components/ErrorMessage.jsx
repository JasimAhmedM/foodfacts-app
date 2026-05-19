import Alert from '@mui/material/Alert'

function ErrorMessage({ message }) {
  return <Alert severity="error" sx={{ mb: 3 }}>{message}</Alert>
}

export default ErrorMessage
