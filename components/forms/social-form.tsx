import React from "react";
import { Button } from "../ui/button";
import { IconType } from "react-icons";

interface SocialFormProps {
  icon: IconType;
  onClick: () => void;
}

const SocialForm: React.FC<SocialFormProps> = ({ icon: Icon, onClick }) => {
  return (
    <Button size={"icon"} className="w-full" onClick={onClick}>
      <Icon />
    </Button>
  );
};

export default SocialForm;
