export interface IFilmDataShort {
  imdbId: string;
  title: string;
  year: number;
}

export interface IFilmDataShortActionProps extends IFilmDataShort {
  category: string;
}
