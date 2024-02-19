import _ from "lodash";

export default function mergeClasses(
  ...classes: (string | undefined)[]
): string {
  return _(classes)
    .chain()
    .filter((c) => !!c)
    .uniq()
    .join(" ")
    .value();
}
