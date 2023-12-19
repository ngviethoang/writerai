import { useAppStore } from '@/store';
import { Button } from '../ui/button';
import { useCallback, useEffect, useMemo } from 'react';

interface GptButtonsProps {
  buttons: any[];
  disabled: boolean;
  onClick: (item: any) => () => void;
}

export default function GptButtons({
  buttons,
  disabled,
  onClick,
}: GptButtonsProps) {
  const { question, content } = useAppStore();

  const isDisabled = useCallback(
    (item: any) => {
      return disabled || !question || (item.requireContent && !content);
    },
    [disabled, question, content]
  );

  return (
    <>
      {buttons.map((item) => (
        <Button
          key={item.name}
          size={'sm'}
          disabled={isDisabled(item)}
          onClick={onClick(item)}
        >
          {item.name}
        </Button>
      ))}
    </>
  );
}
