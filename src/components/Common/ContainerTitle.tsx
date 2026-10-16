import { cn } from "@/lib/utils";

type ContainerTitleProps = {
  className?: string;
  title: string;
};

const ContainerTitle = ({title, className}: ContainerTitleProps) => {

  return (
    <h1
      className={cn("text-2xl md:text-5xl font-medium text-primary dark:text-white", className)}
    >
      {title}
    </h1>
  )
};

export default ContainerTitle;
