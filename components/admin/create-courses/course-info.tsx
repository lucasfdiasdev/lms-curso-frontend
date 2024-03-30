"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ICourseInfo {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInfo: React.FC<ICourseInfo> = ({
  courseInfo,
  setCourseInfo,
  setActive,
  active,
}) => {
  const [dragging, setDdragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCourseInfo(courseInfo);
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDdragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDdragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDdragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto my-12">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Label>Course Name</Label>
          <Input
            id="name"
            type="text"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS plataform with next 13"
          />
        </div>
        <div className="mb-5 flex flex-col">
          <Label>Course Description</Label>
          <textarea
            id="description"
            cols={30}
            rows={10}
            name=""
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            placeholder="Write something amazing..."
            className="rounded-md bg-transparent border p-2 mt-1"
          />
        </div>
        <div className="w-full flex justify-between mb-5">
          <div className="w-[45%]">
            <Label>Course Price</Label>
            <Input
              id="price"
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="R$ 0.000,00"
            />
          </div>
          <div className="w-[50%]">
            <Label>Estimated Price (optional)</Label>
            <Input
              id="price"
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="R$ 0.000,00"
            />
          </div>
        </div>
        <div className="mb-5">
          <Label>Course Tags</Label>
          <Input
            id="tags"
            type="text"
            name=""
            required
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            placeholder="Next, MongoDB, Next-Auth, Typescript, Nodejs"
          />
        </div>
        <div className="w h-full flex justify-between mb-5">
          <div className="w-[45%]">
            <Label>Course Level</Label>
            <Input
              id="level"
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="MERN stack LMS plataform with next 13"
            />
          </div>
          <div className="w-[50%]">
            <Label>Course DemoURL</Label>
            <Input
              id="demoUrl"
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="MERN stack LMS plataform with next 13"
            />
          </div>
        </div>
        <div className="mb-5">
          <Label>Thumbnail</Label>
          <Input
            id="file"
            type="file"
            accept="image/*"
            required
            className="hidden"
            onChange={handleFileChange}
          />
          <Label
            htmlFor="file"
            className={cn(
              "w-full min-h-[10vh] p-3 border flex items-center justify-center cursor-pointer",
              dragging ? "bg-blue-500" : "bg-transparent"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                width={1200}
                height={1200}
                src={courseInfo.thumbnail}
                alt={courseInfo.name}
                className="max-h-full w-full object-cover object-center"
              />
            ) : (
              <span>Drag and drop your thumbnail here or click to browse</span>
            )}
          </Label>
        </div>
        <div className="w-full flex items-center justify-end">
          <Button type="submit" className="w-full md:max-w-fit">
            Próximo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
