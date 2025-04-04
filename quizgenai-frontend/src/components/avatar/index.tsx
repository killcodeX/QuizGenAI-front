import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  handleClick: () => void;
  name: string;
}

export default function AvatarDemo({ handleClick, name }: AvatarProps) {
  return (
    <Avatar onClick={handleClick}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
