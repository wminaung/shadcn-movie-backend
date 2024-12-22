import EditMovieByIdPage from "@/app/pages/EditMovieByIdPage";

interface Props {
  params: { id: string };
  searchParams: { title: string };
}

const MovieById = ({ params }: Props) => {
  return <EditMovieByIdPage params={params} />;
};

export default MovieById;
