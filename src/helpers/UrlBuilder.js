import cfg from "../config.json";

export const urlBuilder = (path) => path ? `${cfg.backend}${path}` : `${cfg.backend}/`;
