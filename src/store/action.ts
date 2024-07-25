import { TypeAction } from "../types/type-action.ts";
import { TypesLocale, TypesTheme } from "../types/types-settings-site.ts";
import {
  TypesComment,
  TypesDesignerFull,
  TypesDesignerIssuesApiFull,
  TypesProjectApiRequest,
} from "../types/types-data.ts";

export const changeTheme = (mode: TypesTheme) =>
  ({
    type: TypeAction.ChangeTheme,
    payload: mode,
  }) as const;

export const changeLocale = (locale: TypesLocale) =>
  ({
    type: TypeAction.ChangeLocale,
    payload: locale,
  }) as const;

export const fillComments = (comments: TypesComment[]) =>
  ({
    type: TypeAction.FillComments,
    payload: comments,
  }) as const;

export const fillDesigners = (designers: TypesDesignerFull[]) =>
  ({
    type: TypeAction.FillDesigners,
    payload: designers,
  }) as const;

export const fillIssues = (issues: TypesDesignerIssuesApiFull[]) =>
  ({
    type: TypeAction.FillIssues,
    payload: issues,
  }) as const;

export const sortDesigners = (designers: TypesDesignerFull[]) =>
  ({
    type: TypeAction.SortDesigners,
    payload: designers,
  }) as const;

export const fillProject = (project: TypesProjectApiRequest[]) =>
  ({
    type: TypeAction.FillProject,
    payload: project,
  }) as const;
