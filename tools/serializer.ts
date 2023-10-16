const mapReplacer = (key: any, value: any) => {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
};

const idReplacer = (key: any, value: any) => {
  if (key == "id" || String(key).includes("Id")) {
    return String(value);
  } else {
    return value;
  }
};

const replacer = (k: any, v: any) => idReplacer(k, mapReplacer(k, v));

export const serializeWithMaps = (value: any) =>
  JSON.stringify(value, replacer);

const mapReviver = (key: any, value: any) => {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
};

const idReviver = (key: any, value: any) => {
  if (key == "id" || String(key).includes("Id")) {
    return String(value);
  } else {
    return value;
  }
};

const reviver = (k: any, v: any) => idReviver(k, mapReviver(k, v));

export const deserializeWithMaps = (text: string) => JSON.parse(text, reviver);
