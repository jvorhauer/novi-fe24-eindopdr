export default (str) => str && str.trim().length > 0 ? str.replace(/\[/g, '<').replace(/]/g, '>') : str
