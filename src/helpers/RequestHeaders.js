export const requestHaders = ({ token }) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }
}
