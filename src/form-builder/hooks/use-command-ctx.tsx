'use client';
import { createSafeContext } from '@/form-builder/libs/create-safe-context';
import * as React from 'react';

type CommandCtx = {
  openCommand: boolean;
  setOpenCommand: React.Dispatch<React.SetStateAction<boolean>>;
  stepIndex: number | undefined,
  setStepIndex: React.Dispatch<React.SetStateAction<number | undefined>>
};

const [CommandProv, useCommand] = createSafeContext<CommandCtx>(
  'useCommand must be used within a CommandProv provider',
);

const CommandProvider = ({ children, keyListen = true }: { children: React.ReactNode, keyListen?: boolean }) => {
  const [openCommand, setOpenCommand] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key === 'f') {
        e.preventDefault();
        setOpenCommand((open) => !open);
      }
    };
    if (keyListen) {
      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }
  }, []);
  return (
    <CommandProv value={{ openCommand, setOpenCommand, setStepIndex, stepIndex }}>
      {children}
    </CommandProv>
  );
};

export { CommandProvider, useCommand };
