export type NewItem = {
  id?: number;
  title: string;
  url: string;
  author: string;
  date: string;
  upCount?: number;
  digest?: string;
};

export type UpdData = {
  title?: string;
  url?: string;
  digest?: string;
};
