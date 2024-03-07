export const windDirectionHelper = (data) => {
  if (!data) {
    return "??";
  }
  const deg = data.wind.deg;
  if (deg >  11.25 && deg <=  33.75) return "NNO";
  if (deg >  37.75 && deg <=  56.25) return "NO";
  if (deg >  65.25 && deg <=  78.25) return "ONO";
  if (deg >  78.25 && deg <= 101.25) return "O";
  if (deg > 101.25 && deg <= 123.75) return "OZO";
  if (deg > 123.75 && deg <= 146.25) return "ZO";
  if (deg > 146.25 && deg <= 168.75) return "ZZO";
  if (deg > 168.75 && deg <= 191.25) return "Z";
  if (deg > 191.25 && deg <= 213.75) return "ZZW";
  if (deg > 213.75 && deg <= 236.25) return "ZW";
  if (deg > 236.25 && deg <= 258.75) return "WZW";
  if (deg > 258.75 && deg <= 281.25) return "W";
  if (deg > 281.25 && deg <= 303.75) return "WNW";
  if (deg > 303.75 && deg <= 326.25) return "NW";
  if (deg > 326.25 && deg <= 348.75) return "NNW";
  return "N";
}

export const windSpeedHelper = (data) => {
  return `${data.wind.speed} m/s`;
}


const calcTemp = (tempK) => Math.round((tempK - 273.15) * 10) / 10;

export const conditionHelper = (data) => {
  if (!data) {
    return "???";
  }
  const where = `${data.name} (${data.sys.country})`;
  return `${where}\n${data.weather[0].description}\n`
}

export const tempHelper = (data) => {
  return `${calcTemp(data.main.temp)} (${calcTemp(data.main.feels_like)}) \u00b0C`;
}
