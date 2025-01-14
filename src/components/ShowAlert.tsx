import { AlertDescription, AlertTitle, Alert } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface Props {
  title: string;
  desc: string;
}
const ShowAlert = ({ title, desc }: Props) => {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
    </Alert>
  );
};

export default ShowAlert;
