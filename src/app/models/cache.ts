import { Post } from './post';
export interface Cache {
  expiry: number;
  data: Post[];
}
