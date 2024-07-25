import {
  changeLocale,
  changeTheme,
  fillComments,
  fillDesigners,
  fillIssues,
  fillProject,
  sortDesigners,
} from "../store/action.ts";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { TRootState } from "../store/reducer.ts";
import { AxiosInstance } from "axios";

export enum TypeAction {
  ChangeTheme = "settings-site/ChangeTheme",
  ChangeLocale = "settings-site/ChangeLocale",
  FillComments = "data/FillComments",
  FillDesigners = "data/FillDesigner",
  SortDesigners = "data/SortDesigners",
  FillProject = "data/FillProject",
  FillIssues = "data/FillIssues",
}

export type TypesActions =
  | ReturnType<typeof changeTheme>
  | ReturnType<typeof changeLocale>
  | ReturnType<typeof fillComments>
  | ReturnType<typeof fillDesigners>
  | ReturnType<typeof sortDesigners>
  | ReturnType<typeof fillIssues>
  | ReturnType<typeof fillProject>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<
  R,
  TRootState,
  AxiosInstance,
  TypesActions
>;

export type ThunkAppDispatch = ThunkDispatch<
  TRootState,
  AxiosInstance,
  TypesActions
>;
