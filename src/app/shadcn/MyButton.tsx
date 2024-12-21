import { Button, ButtonProps } from "@/components/ui/button";
import { RefAttributes } from "react";

type Props = ButtonProps & RefAttributes<HTMLButtonElement>;
export function MyButton({
  className,
  onClick,
  variant,
  children,
  ...props
}: Props) {
  return (
    <Button
      className={className}
      onClick={onClick}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
}
