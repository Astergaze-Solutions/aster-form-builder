import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { FaGithub } from 'react-icons/fa6';

const title = 'Shadcn Form Builder';
const description =
  'Build forms in minutes not hours for free using shadcn, tailwindcss, React, Zod, and React Hook Form';

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
    <div className="flex-col-center w-full min-h-screen">
      <div className="h-full grow w-full  container">
        {children}
      </div>

    </div>
  );
}
