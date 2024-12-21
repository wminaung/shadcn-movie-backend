export type Movie = {
  id: number;
  title: string;
  category: string;
  release_year: number;
  description: string;
  rating: number;
  director: string;

  runtime: number; // in minutes
};
export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    category: "Science Fiction",
    release_year: 2010,
    description:
      "A thief who enters the dreams of others must perform one last job.",
    rating: 8.8,
    director: "Christopher Nolan",
    runtime: 148,
  },
  {
    id: 2,
    title: "The Dark Knight",
    category: "Action",
    release_year: 2008,
    description: "Batman faces the Joker in an epic battle for Gotham's soul.",
    rating: 9.0,
    director: "Christopher Nolan",
    runtime: 152,
  },
  {
    id: 3,
    title: "Interstellar",
    category: "Science Fiction",
    release_year: 2014,
    description:
      "A team of explorers travels through a wormhole in space to save humanity.",
    rating: 8.6,
    director: "Christopher Nolan",
    runtime: 169,
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    category: "Action",
    release_year: 2019,
    description: "The Avengers assemble for one final stand against Thanos.",
    rating: 8.4,
    director: "Anthony Russo, Joe Russo",
    runtime: 181,
  },
  {
    id: 5,
    title: "Parasite",
    category: "Thriller",
    release_year: 2019,
    description: "A poor family schemes to infiltrate a wealthy household.",
    rating: 8.6,
    director: "Bong Joon-ho",
    runtime: 132,
  },
  {
    id: 6,
    title: "The Godfather",
    category: "Crime",
    release_year: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    rating: 9.2,
    director: "Francis Ford Coppola",
    runtime: 175,
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    category: "Drama",
    release_year: 1994,
    description:
      "Two imprisoned men bond over several years, finding solace and eventual redemption.",
    rating: 9.3,
    director: "Frank Darabont",
    runtime: 142,
  },
  {
    id: 8,
    title: "Pulp Fiction",
    category: "Crime",
    release_year: 1994,
    description:
      "The lives of two mob hitmen, a boxer, and others intertwine in this darkly comedic film.",
    rating: 8.9,
    director: "Quentin Tarantino",
    runtime: 154,
  },
  {
    id: 9,
    title: "The Matrix",
    category: "Science Fiction",
    release_year: 1999,
    description:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    director: "Lana Wachowski, Lilly Wachowski",
    runtime: 136,
  },
  {
    id: 10,
    title: "Fight Club",
    category: "Drama",
    release_year: 1999,
    description: "An insomniac office worker forms an underground fight club.",
    rating: 8.8,
    director: "David Fincher",
    runtime: 139,
  },
  {
    id: 11,
    title: "Forrest Gump",
    category: "Drama",
    release_year: 1994,
    description:
      "The story of a man with a low IQ who achieves extraordinary things in his life.",
    rating: 8.8,
    director: "Robert Zemeckis",
    runtime: 142,
  },
  {
    id: 12,
    title: "Gladiator",
    category: "Action",
    release_year: 2000,
    description: "A betrayed Roman general seeks revenge.",
    rating: 8.5,
    director: "Ridley Scott",
    runtime: 155,
  },
  {
    id: 13,
    title: "The Lion King",
    category: "Animation",
    release_year: 1994,
    description:
      "The story of a lion cub's journey to adulthood and acceptance of his royal destiny.",
    rating: 8.5,
    director: "Roger Allers, Rob Minkoff",
    runtime: 88,
  },
  {
    id: 14,
    title: "Braveheart",
    category: "Action",
    release_year: 1995,
    description:
      "William Wallace leads his people in a rebellion to free Scotland from English rule.",
    rating: 8.3,
    director: "Mel Gibson",
    runtime: 178,
  },
  {
    id: 15,
    title: "Titanic",
    category: "Romance",
    release_year: 1997,
    description: "A fictionalized account of the sinking of the RMS Titanic.",
    rating: 7.9,
    director: "James Cameron",
    runtime: 195,
  },
  {
    id: 16,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    category: "Fantasy",
    release_year: 2001,
    description: "A young hobbit begins a quest to destroy an evil ring.",
    rating: 8.8,
    director: "Peter Jackson",
    runtime: 178,
  },
  {
    id: 17,
    title: "The Lord of the Rings: The Two Towers",
    category: "Fantasy",
    release_year: 2002,
    description:
      "The Fellowship faces new challenges as Sauron's forces grow stronger.",
    rating: 8.7,
    director: "Peter Jackson",
    runtime: 179,
  },
  {
    id: 18,
    title: "The Lord of the Rings: The Return of the King",
    category: "Fantasy",
    release_year: 2003,
    description: "The final battle for Middle-earth begins.",
    rating: 8.9,
    director: "Peter Jackson",
    runtime: 201,
  },
  {
    id: 19,
    title: "Star Wars: A New Hope",
    category: "Science Fiction",
    release_year: 1977,
    description:
      "Luke Skywalker joins the Rebel Alliance to fight the evil Galactic Empire.",
    rating: 8.6,
    director: "George Lucas",
    runtime: 121,
  },
  {
    id: 20,
    title: "Star Wars: The Empire Strikes Back",
    category: "Science Fiction",
    release_year: 1980,
    description:
      "The Rebels suffer a major defeat as the Empire gains the upper hand.",
    rating: 8.7,
    director: "Irvin Kershner",
    runtime: 124,
  },
];
