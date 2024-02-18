import { ID } from "./ID";

export interface Favorite {
  id: ID;
  type: FavoriteType;
}

export enum FavoriteType {
  List = "list",
  Note = "note",
}
