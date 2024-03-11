export const windDirectionHelper = (deg) => {
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

export const beaufortHelper = (speed) => {
  if (speed <= 0.2)  return 0;
  if (speed <= 1.5)  return 1;
  if (speed <= 3.3)  return 2;
  if (speed <= 5.4)  return 3;
  if (speed <= 7.9)  return 4;
  if (speed <= 10.7) return 5;
  if (speed <= 13.8) return 6;
  if (speed <= 17.1) return 7;
  if (speed <= 20.7) return 8;
  if (speed <= 24.4) return 9;
  if (speed <= 28.4) return 10;
  if (speed <= 32.6) return 11;
  return 12;
}

export const windSpeedHelper = (speed) => `${round(speed * 3.6)} km/u`

const round = (nr) => Math.round(nr  * 10) / 10;
const calcTemp = (tempK) => round(tempK - 273.15);

export const conditionHelper = (data) => {
  const where = `${data.name} (${data.sys.country})`;
  return `${where}\n(${whenHelper(data.dt)})\n${data.weather[0].description}\n`
}

export const tempHelper = (data) => {
  return `${calcTemp(data.main.temp)} (${calcTemp(data.main.feels_like)}) \u00b0C`;
}

export const whenHelper = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString().slice(0, 5);
}
