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
  background: "#f2f2ee",
  backgroundText: "#100801",
  primary: "#bdd358",
  primaryText: "#100801",
  secondary: "#373438",
  secondaryText: "#ebe542",
  list: "#ffffff",
};
