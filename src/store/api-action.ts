import { APIRoutes } from "../services/const.ts";
import {
  TypesComment,
  TypesDesignerApiRequest,
  TypesDesignerIssuesApiFull,
  TypesProjectApiRequest,
} from "../types/types-data.ts";
import { ThunkActionResult } from "../types/type-action.ts";
import {
  fillComments,
  fillDesigners,
  fillIssues,
  fillProject,
} from "./action.ts";

export const fetchDataCommentsAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<TypesComment[]>(APIRoutes.comment);
    dispatch(fillComments(data));
  };

export const fetchDataDesignersAction =
  (sortAndFilter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<TypesDesignerApiRequest>(
      APIRoutes.designer + `${sortAndFilter}`,
    );
    const { results } = data;
    dispatch(fillDesigners(results));
  };

export const fetchDataIssuesAction =
  (sortAndFilter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<TypesDesignerIssuesApiFull[]>(
      APIRoutes.issue + `${sortAndFilter}`,
    );
    dispatch(fillIssues(data));
  };

export const fetchDataProjectAction =
  (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<TypesProjectApiRequest[]>(APIRoutes.project);
    dispatch(fillProject(data));
  };
