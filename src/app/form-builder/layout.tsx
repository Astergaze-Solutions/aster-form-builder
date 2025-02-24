import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Form Builder",
  description: "Opensource project for form builder",
};
//======================================
export default function FormBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-col-center ">
      <div className="h-full w-full">
        {children}
      </div>

    </div>
  );
}
