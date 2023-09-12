const replacer = (key: any, value: any) => {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
};

export const serializeWithMaps = (value: any) =>
  JSON.stringify(value, replacer);

const reviver = (key: any, value: any) => {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
};

export const deserializeWithMaps = (text: string) => JSON.parse(text, reviver);
