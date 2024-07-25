import {
  TypesDesignerApiRequest,
  TypesDesignerFull,
  TypesDesignerIssuesApiFull,
} from "../types/types-data.ts";
import { api } from "../main.tsx";
import { APIRoutes } from "../services/const.ts";

export const fetchGetDesignerBySort = async (
  sortAndFilter: string,
): Promise<TypesDesignerFull[]> => {
  const { data } = await api.get<TypesDesignerApiRequest>(
    APIRoutes.designer + `${sortAndFilter}`,
  );
  const { results } = data;
  return results;
};
export const fetchGetIssuesForDesigners = async (
  sortAndFilter: string,
): Promise<TypesDesignerIssuesApiFull[]> => {
  const { data } = await api.get<TypesDesignerIssuesApiFull[]>(
    APIRoutes.issue + `${sortAndFilter}`,
  );
  return data;
};
