import { Badge } from "@/components/ui/badge";

interface Props {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | null
    | undefined;
  title: React.ReactNode;
}

function MyBadge({ variant, title }: Props) {
  return (
    <div>
      <Badge variant={variant}> {title} </Badge>
    </div>
  );
}

export default MyBadge;
