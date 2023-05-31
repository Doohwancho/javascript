import {User} from "./User";

export interface Board { //TODO - typescript에서 interface를 각 컴포넌트마다 써줬는데, dto로 따로 빼서 import해서 처리하네?
  id?: number;
  title: string;
  content: string;
  created?: string;
  updated?: string;
  user?: User;
}
