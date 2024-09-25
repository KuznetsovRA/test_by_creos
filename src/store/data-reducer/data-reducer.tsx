import { TypeAction, TypesActions } from "../../types/type-action.ts";
import { TypeDataState } from "../../types/state/data-state.ts";

const initialState: TypeDataState = {
  comments: [],
  designers: [],
  sortAndFilterDesigners: [],
  projects: [],
  issues: [],
};

const dataReducer = (
  state: TypeDataState = initialState,
  action: TypesActions,
): TypeDataState => {
  switch (action.type) {
    case TypeAction.FillComments: {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case TypeAction.FillDesigners: {
      return {
        ...state,
        designers: action.payload,
      };
    }
    case TypeAction.FillProject: {
      return {
        ...state,
        projects: action.payload,
      };
    }
    case TypeAction.FillIssues: {
      return {
        ...state,
        issues: action.payload,
      };
    }
    case TypeAction.SortDesigners: {
      return {
        ...state,
        sortAndFilterDesigners: action.payload,
      };
    }
    default:
      return state;
  }
};

export { dataReducer };
