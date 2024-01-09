export const required = (v: any) => !!v || "This field is required !";
export const isNumber = (v: any) => !isNaN(Number(v));
