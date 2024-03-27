import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ButtonUser = () => {
  return (
    <div>
      <Avatar>
        <AvatarImage />
        <AvatarFallback>user</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ButtonUser;
