export interface Theme {
  id: "theme";
  background: string;
  backgroundText: string;
  primary: string;
  primaryText: string;
  secondary: string;
  secondaryText: string;
  list: string;
}

export const DEFAULT_THEME: Theme = {
  id: "theme",
  background: "#fdfffd",
  backgroundText: "#100801",
  primary: "#d579a6",
  primaryText: "#000000",
  secondary: "#e87270",
  secondaryText: "#000000",
  list: "#fff8e8",
};
