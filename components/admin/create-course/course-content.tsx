"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { BsLink45Deg } from "react-icons/bs";
import {
  Pencil,
  Trash2,
  CirclePlus,
  PlusCircle,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ICourseContent {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
}

const CourseContent: React.FC<ICourseContent> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [activeSection, setActiveSection] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleCourseSubmit(courseContentData);
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({
      title: "",
      url: "",
    });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        // use the last video section if available, else use user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto my-12 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <div
              key={index}
              className={cn(
                "w-full bg-[#cdc8c817] p-4",
                showSectionInput ? "mt-10" : "mb-0"
              )}
            >
              {showSectionInput && (
                <div className="flex w-full items-center gap-4">
                  <Input
                    type="text"
                    className={cn(
                      "text-xl cursor-pointer bg-transparent border-0 border-b border-b-white rounded-none focus:rounded-sm",
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    )}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <Pencil className="cursor-pointer dark:text-white text-black" />
                </div>
              )}
              <div className="w-full flex items-center justify-between my-0">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p className="dark:text-white text-black mt-5">
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div></div>
                )}
                {/* arrow button for collapse video content */}
                <div className="w-full flex items-center justify-end my-4">
                  <Trash2
                    size={20}
                    className={cn(
                      "dark:text-white mr-2 text-black",
                      index > 0 ? "cursor-pointer" : "cursor-no-drop"
                    )}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <ChevronDown
                    size={20}
                    className="dark:text-white text-black cursor-pointer"
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <Label>Video Title</Label>
                    <Input
                      type="text"
                      placeholder="Project Plan..."
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <Label>Video Url</Label>
                    <Input
                      type="text"
                      placeholder="Sdder URL"
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  <div className="mb-12">
                    <Label>Video Description</Label>
                    <Textarea
                      rows={8}
                      cols={30}
                      placeholder="Sdder URL"
                      value={item.description}
                      className="!h-min py-2"
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>
                  {item?.links.map((link: any, linkIndex: number) => (
                    <div className="mb-3" key={linkIndex}>
                      <div className="w-full flex items-center justify-between mb-3">
                        <Label>Link {linkIndex + 1}</Label>
                        <Trash2
                          size={20}
                          className={cn(
                            "dark:text-white mr-2 text-black",
                            linkIndex === 0
                              ? "cursor-pointer"
                              : "cursor-no-drop"
                          )}
                          onClick={() => {
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex);
                          }}
                        />
                      </div>
                      <Input
                        type="text"
                        placeholder="Source Code... (Link title)"
                        value={link.title}
                        className="mb-3"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <Input
                        type="url"
                        placeholder="Source Code  URL... (Link URL)"
                        value={link.url}
                        className="mb-3"
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}
                  {/* add link button */}
                  <div className="inline-block my-4">
                    <p
                      className="flex items-center text-lg dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" /> Add Link
                    </p>
                  </div>
                </>
              )}
              {/* add new content */}
              {index === courseContentData.length - 1 && (
                <div className="my-4">
                  <p
                    className="flex items-center text-lg dark:text-white text-black cursor-pointer"
                    onClick={(e: any) => newContentHandler(item)}
                  >
                    <CirclePlus className="mr-2" /> Add New Content
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div
          className="flex items-center text-lg mt-4 cursor-pointer"
          onClick={() => addNewSection()}
        >
          <PlusCircle className="mr-2" /> Add New Section
        </div>
      </form>
      <div className="w-full flex items-center justify-between mt-4 gap-4">
        <Button className="w-full md:max-w-fit" onClick={() => prevButton()}>
          Voltar
        </Button>
        <Button className="w-full md:max-w-fit" onClick={() => handleOptions()}>
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default CourseContent;
