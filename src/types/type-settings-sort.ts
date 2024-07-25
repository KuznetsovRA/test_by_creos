import { Dispatch, SetStateAction } from "react";

export interface TypeSortMenu {
  head: string;
  headEng: string;
  typeSort: string[];
  typeSortEng: string[];
  currentValue: string;
  handle: Dispatch<SetStateAction<string>>;
}

export type TypesSortTypeDesigners =
  | `email`
  | `username`
  | `median-time`
  | `tasks-completed`;
export type TypesSortOrderDesigners = "descending" | "ascending";
