import { api } from "./api";
import { SystemSettings } from "../types";

export const settingsService = {
  fetchSettings: (): Promise<SystemSettings> => {
    return api.fetchSettings();
  },

  saveSettings: (settings: SystemSettings): Promise<SystemSettings> => {
    return api.saveSettings(settings);
  }
};
