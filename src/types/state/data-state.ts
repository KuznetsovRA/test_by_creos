import {
  TypesComment,
  TypesDesignerFull,
  TypesDesignerIssuesApiFull,
  TypesProjectApiRequest,
} from "../types-data.ts";

export interface TypeDataState {
  comments: TypesComment[];
  designers: TypesDesignerFull[];
  sortAndFilterDesigners: TypesDesignerFull[];
  projects: TypesProjectApiRequest[];
  issues: TypesDesignerIssuesApiFull[];
}
