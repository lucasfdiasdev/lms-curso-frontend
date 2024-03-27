import Heading from "@/utils/heading";

import SectionHero from "@/components/home/section-hero";

const HomePage = () => {
  return (
    <div>
      <Heading
        title="LMS Cursos Home"
        description="LMS is a plataform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <SectionHero />
    </div>
  );
};

export default HomePage;
