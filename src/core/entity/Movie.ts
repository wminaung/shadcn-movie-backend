export class Movie {
  constructor(
    public id: string,
    public title: string,
    public category: string,
    public release_year: number,
    public description: string,
    public rating: number,
    public director: string,
    public runtime: number
  ) {}
}
