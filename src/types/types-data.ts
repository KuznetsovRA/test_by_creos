interface TypesDesignerBrief {
  avatar: string;
  username: string;
  thumbnails: {
    avatar: string;
    avatar_2x: string;
    avatar_webp: string;
    avatar_webp_2x: string;
  };
}

export interface TypesDesignerIssues {
  id: number;
  key: string;
  date_created: Date;
  date_started_by_designer: Date;
  date_finished_by_designer: Date | null;
  status: string;
}

export interface TypesDesignerIssuesApiFull {
  id: number;
  status: string;
  designer: string;
  project: string;
  date_created: Date;
  summary: string;
  received_from_client: number;
  send_to_project_manager: number;
  send_to_account_manager: number;
  send_to_designer: number;
  date_updated: Date;
  date_started_by_designer: Date;
  date_finished_by_designer: Date;
  date_finished: Date;
}

export interface TypesComment {
  id: number;
  issue: string;
  designer: TypesDesignerBrief;
  date_created: Date;
  message: string;
}

export interface TypesDesignerFull extends TypesDesignerBrief {
  email: "julia26@example.net";
  issues: TypesDesignerIssues[];
}

export interface TypesDesignerApiRequest {
  count: number;
  next: string;
  previous: string | null;
  results: TypesDesignerFull[];
}

export interface TypesProjectApiRequest {
  id: number;
  name: string;
  key: string;
}
