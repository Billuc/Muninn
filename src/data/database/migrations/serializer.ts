import { PipelineFactory } from "pipelineer";

interface JSONProperty {
  key: any;
  value: any;
}

const mapReplacer = {
  exec: (req: JSONProperty, next: (req: JSONProperty) => any | undefined) => {
    const value =
      req.value instanceof Map
        ? { dataType: "Map", value: Array.from(req.value.entries()) }
        : req.value;
    return next({ key: req.key, value }) ?? value;
  },
};
const idReplacer = { // Might delete later
  exec: (req: JSONProperty, next: (req: JSONProperty) => any | undefined) => {
    const value =
      (req.key == "id" || String(req.key).includes("Id")) &&
      req.value !== undefined
        ? String(req.value)
        : req.value;
    return next({ key: req.key, value }) ?? value;
  },
};

const replacerFactory = new PipelineFactory<JSONProperty, any>();
replacerFactory.push(mapReplacer);
replacerFactory.push(idReplacer);
const replacer = replacerFactory.build();

export const serializeWithMaps = (v: any) =>
  JSON.stringify(v, (key, value) => replacer.exec({ key, value }));

const mapReviver = {
  exec: (req: JSONProperty, next: (req: JSONProperty) => any | undefined) => {
    const value =
      typeof req.value === "object" &&
      req.value !== null &&
      req.value.dataType === "Map"
        ? new Map(
            req.value.value.map(([k, v]: [any, any]) => [
              v.id !== undefined ? String(k) : k,
              v,
            ])
          )
        : req.value;
    return next({ key: req.key, value }) ?? value;
  },
};
const idReviver = { // Might delete later
  exec: (req: JSONProperty, next: (req: JSONProperty) => any | undefined) => {
    const value =
      req.key == "id" || String(req.key).includes("Id")
        ? String(req.value)
        : req.value;
    return next({ key: req.key, value }) ?? value;
  },
};

const reviverFactory = new PipelineFactory<JSONProperty, any>();
reviverFactory.push(mapReviver);
reviverFactory.push(idReviver);
const reviver = reviverFactory.build();

export const deserializeWithMaps = (text: string) =>
  JSON.parse(text, (key, value) => reviver.exec({ key, value }));
