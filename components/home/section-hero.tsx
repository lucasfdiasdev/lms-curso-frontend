import { Button } from "@/components/ui/button";

const SectionHero = () => {
  return (
    <section className="flex items-center justify-center mt-24 w-full min-h-full">
      <div className="text-center w-[800px]">
        <h1 className="text-6xl font-bold">
          Descubra mais de 1000 cursos grátis para criativos
        </h1>
        <p className="text-muted-foreground font-semibold mt-4">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <Button className="mt-12">Explorar cursos</Button>
      </div>
    </section>
  );
};

export default SectionHero;
