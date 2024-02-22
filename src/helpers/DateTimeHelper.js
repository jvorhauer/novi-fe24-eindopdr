export const futureDateTime = () => {
  let result = new Date();
  result.setDate(result.getDate() + 1);
  return result.toISOString().substring(0, 11) + "12:00:00";
}
