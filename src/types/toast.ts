import { ProgressBarProps } from 'src/components/ui/Toast/ProgressBar';

export interface ToastOptions extends ProgressBarProps {
  message: string;
}

export interface Toast extends ToastOptions {
  id: string;
  timeout: NodeJS.Timeout;
  playedAt: number;
  remainingTime: number;
  pausedAt?: number | null;
}
