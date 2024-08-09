import { VariantProps } from 'class-variance-authority';

import { styles } from 'src/components/ui/Toast/ProgressBar';

export interface ToastOptions extends VariantProps<typeof styles> {
  message: string;
}

export interface Toast extends ToastOptions {
  id: number;
  timeout: NodeJS.Timeout;
  playedAt: number;
  remainingTime: number;
  pausedAt?: number | null;
}
