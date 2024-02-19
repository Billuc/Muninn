import * as fa from "@quasar/extras/fontawesome-v6";
import * as mdi from "@quasar/extras/mdi-v7";

const faMapping: { [k: string]: string } = {
  fas: "fa-solid",
  far: "fa-regular",
  fab: "fa-brands",
};

const faFamilyMapping: { [k: string]: string } = {
  fas: "Solid",
  far: "Regular",
  fab: "Brands",
};

export const FA_OPTIONS = Object.entries(fa).map((v) => {
  const iconName = v[0];
  const iconPrefix = iconName.slice(0, 3);
  const iconFamily = faMapping[iconPrefix];
  const iconRawName = iconName.slice(3);
  const iconValue = iconRawName.replaceAll(
    new RegExp(/([A-Z])/g),
    (match: string) => `-${match.toLowerCase()}`
  );

  const label =
    iconRawName[0].toUpperCase() +
    iconRawName.slice(1).replaceAll(new RegExp(/([A-Z])/g), ` $1`) +
    " (" +
    faFamilyMapping[iconPrefix] +
    ")";
  const value = `${iconFamily} fa${iconValue}`;

  return { label, value };
});

export const MDI_OPTIONS = Object.entries(mdi).map((v) => {
  const iconName = v[0];
  const iconRawName = iconName.slice(3);
  const iconValue = iconRawName.replaceAll(
    new RegExp(/([A-Z0-9])/g),
    (match: string) => `-${match.toLowerCase()}`
  );

  const label =
    iconRawName[0].toUpperCase() +
    iconRawName.slice(1).replaceAll(new RegExp(/([A-Z0-9])/g), ` $1`);
  const value = `mdi${iconValue}`;

  return { label, value };
});
