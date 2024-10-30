export interface IHero {
  id: string;
  slug: string;
  nickname: string;
  catch_phrase: string;
  images: string[];
  origin_description: string;
  real_name: string;
  superpowers: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetAllHeroes {
  heroes: IHero[];
  page: number;
  count: number;
}
