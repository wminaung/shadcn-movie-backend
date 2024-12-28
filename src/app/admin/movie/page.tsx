import AllMoviePage from "@/components/pages/AllMoviePage";

interface Props {
  searchParams: { title?: string; category?: string };
}

export default function AllMovies({ searchParams }: Props) {
  return <AllMoviePage searchParams={searchParams} />;
}
