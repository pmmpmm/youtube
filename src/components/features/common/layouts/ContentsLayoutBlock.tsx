import { ReactElement } from "react";

type LayoutProps = {
  children: string | ReactElement | ReactElement[];
};

const ContentsLayoutBlock = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center items-start w-full m-auto min-h-[calc(100vh-var(--header-height)-var(--container-bottom))] sm:min-h-[calc(100vh-var(--header-height-sm)-var(--container-bottom))] sm:items-center sm:bg-gradient-to-t sm:from-base-950 sm:from-10% sm:via-slate-100 sm:via-60% sm:to-base-950 sm:to-90% dark:via-base-950">
      <div className="w-full px-4 py-8 bg-base-950 sm:w-[480px] sm:px-11 sm:py-11 sm:rounded-3xl sm:shadow-block lg:w-[940px] dark:sm:bg-base-900">
        {children}
      </div>
    </div>
  );
};

export default ContentsLayoutBlock;
