import EditMovieByIdPage from "@/components/pages/EditMovieByIdPage";

interface Props {
  params: { id: string };
}

const MovieById = ({ params }: Props) => {
  return <EditMovieByIdPage params={params} />;
};

export default MovieById;
