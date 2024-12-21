import MovieByIdPage from "@/app/pages/MovieByIdPage";

interface Props {
  params: { id: string };
  searchParams: { title: string };
}

const MovieById = ({ params }: Props) => {
  return <MovieByIdPage params={params} />;
};

export default MovieById;
