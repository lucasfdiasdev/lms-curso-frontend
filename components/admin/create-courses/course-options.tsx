"use client";

import { cn } from "@/lib/utils";

import { IoMdCheckmark } from "react-icons/io";

interface ICourseOptions {
  active: number;
  setActive?: (active: number) => void;
}

const CourseOptions: React.FC<ICourseOptions> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className={cn("w-full flex py-5")}>
          <div
            className={cn(
              "w-[20px] h-[20px] rounded-full flex items-center justify-center relative",
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            )}
          >
            <IoMdCheckmark className="text-lg" />
            {index !== options.length - 1 && (
              <div
                className={cn(
                  "absolute h-[60px] w-[2px] top-4",
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                )}
              />
            )}
          </div>
          <h5
            className={cn(
              "pl-8",
              active === index
                ? "dark:text-white text-back"
                : "dark:text-white text-back"
            )}
          >
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
