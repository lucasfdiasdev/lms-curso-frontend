"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import avatarIcon from "@/public/user.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface IProfileInfo {
  user: any;
  avatar: string;
}
const ProfileInfo: React.FC<IProfileInfo> = ({ user, avatar }) => {
  const [name, setName] = useState<any>(user && user.name);
  const [updatedAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updatedAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    console.log("submit");
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <div className="relative mx-auto">
          <Image
            width={120}
            height={120}
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt={user.name}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full mb-12"
          />
        </div>
        <div className="w-full pl-6 md:pl-10">
          <form onSubmit={handleSubmit}>
            <div className="md:w-[50%] m-auto block pb-4">
              <div className="w-[100%] mb-4">
                <Label htmlFor="name">Avatar</Label>
                <Input
                  type="file"
                  name=""
                  id="avatar"
                  className="cursor-pointer"
                  onChange={imageHandler}
                  accept="image/png,image/jpg,image/jpeg,image/webp"
                />
              </div>
              <div className="w-[100%]">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-[100%] pt-4">
                <Label htmlFor="name">Email Adresss</Label>
                <Input
                  type="text"
                  name="name"
                  readOnly
                  required
                  value={user?.email}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button className="w-[50%] mt-6">Update</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
