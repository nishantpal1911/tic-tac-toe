import { cva, VariantProps } from 'class-variance-authority';
import { memo, useEffect } from 'react';

import { Toast } from 'src/types/toast';

export type ProgressBarProps = VariantProps<typeof styles>;

interface Props {
  toast: Toast;
}

const styles = cva('absolute bottom-0 h-1 w-full rounded-bl-md rounded-br-md', {
  variants: {
    type: {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warn: 'bg-yellow-500',
      info: 'bg-blue-300',
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

const ProgressBar = memo(function ProgressBar({ toast }: Props) {
  useEffect(() => {
    const element = document.getElementById(toast.id);
    if (!element) return;

    if (toast.pausedAt) {
      // Get current dynamic width
      const computedStyle = window.getComputedStyle(element);
      const remainingWidth = computedStyle.getPropertyValue('width');
      // Remove transition
      element.style.transition = '';
      // Set static width to current computed width
      element.style.width = remainingWidth;
    } else {
      // Set transition with remaining time on toast
      element.style.transition = `width ${toast.remainingTime}ms linear`;
      // Let width transition towards 0
      setTimeout(() => {
        element.style.width = '0';
      }, 0);
    }
  }, [toast.id, toast.pausedAt, toast.remainingTime]);

  return <div id={toast.id} className={styles({ type: toast.type })} />;
});

export default ProgressBar;
