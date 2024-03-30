import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleMinus, CirclePlus } from "lucide-react";
import toast from "react-hot-toast";

interface ICourseData {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseData: React.FC<ICourseData> = ({
  benefits,
  prerequisites,
  setBenefits,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleDecrementBenefit = () => {
    if (benefits.length > 1) {
      setBenefits(benefits.slice(0, benefits.length - 1));
    }
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleDecrementPrerequisites = () => {
    if (prerequisites.length > 1) {
      setPrerequisites(prerequisites.slice(0, prerequisites.length - 1));
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== " " &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go");
    }
  };

  return (
    <div className="w-[80%] m-auto my-12">
      <div className="mb-5">
        <Label className="text-xl" htmlFor="email">
          What are the benefits for students in this course?
        </Label>
        {benefits.map((benefit: any, index: number) => (
          <Input
            id="benefit"
            key={index}
            type="text"
            required
            value={benefit.title}
            onChange={(e: any) => handleBenefitChange(index, e.target.value)}
            name="benefit"
            placeholder="You will be able to build a full stack LMS plataform..."
            className="mb-5"
          />
        ))}
        <div className="mt-4 flex items-center gap-4">
          <CirclePlus
            size={30}
            className="cursor-pointer dark:text-white text-black"
            onClick={handleAddBenefit}
          />
          <CircleMinus
            size={30}
            className={
              benefits.length > 1
                ? "cursor-pointer dark:text-white text-black"
                : "hidden"
            }
            onClick={handleDecrementBenefit}
          />
        </div>
      </div>
      <div>
        <Label className="text-xl" htmlFor="email">
          What are the prerequisites for starting this course?
        </Label>
        {prerequisites.map((prerequisites: any, index: number) => (
          <Input
            id="prerequisites"
            key={index}
            type="text"
            required
            value={prerequisites.title}
            onChange={(e: any) =>
              handlePrerequisitesChange(index, e.target.value)
            }
            name="prerequisites"
            placeholder="You need basic knowledge of MERN Stack..."
            className="mb-5"
          />
        ))}
        <div className="mt-4 flex items-center gap-4">
          <CirclePlus
            size={30}
            className="cursor-pointer dark:text-white text-black"
            onClick={handleAddPrerequisites}
          />
          <CircleMinus
            size={30}
            className={
              prerequisites.length > 1
                ? "cursor-pointer dark:text-white text-black"
                : "hidden"
            }
            onClick={handleDecrementPrerequisites}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <Button className="w-full md:max-w-fit" onClick={() => prevButton()}>
          Voltar
        </Button>
        <Button
          type="submit"
          className="w-full md:max-w-fit"
          onClick={() => handleOptions()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default CourseData;
