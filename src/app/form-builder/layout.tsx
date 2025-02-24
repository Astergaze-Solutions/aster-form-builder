import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
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
    <div className="flex-col-center ">
      <div className="h-full w-full">
        {children}
      </div>

    </div>
  );
}
