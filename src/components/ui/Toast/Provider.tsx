import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Toast } from 'src/components/ui/Toast';
import { ToastContext } from 'src/context/toast';
import { Toast as IToast, ToastOptions } from 'src/types/toast';

const TOAST_TIMEOUT = 10000;

export default function ToastProvider(props: PropsWithChildren<{}>) {
  const { addToast, pauseToast, removeToast, resumeToast, toasts } = useToastManager();

  const contextValue = useMemo(() => ({ add: addToast }), [addToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      <div className='fixed bottom-8 right-8 z-50 flex flex-col gap-2 shadow-xl drop-shadow-md'>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onPauseToast={pauseToast}
            onRemoveToast={removeToast}
            onResumeToast={resumeToast}
          />
        ))}
      </div>
      {props.children}
    </ToastContext.Provider>
  );
}

const useToastManager = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (newToast: ToastOptions) => {
      const id = uuidv4();
      const timeout = setTimeout(() => removeToast(id), TOAST_TIMEOUT);
      const playedAt = new Date().getTime();
      // Store id, timeout, playedAt, and remainingTime in toast
      setToasts((prevToasts) => [...prevToasts, { ...newToast, id, timeout, playedAt, remainingTime: TOAST_TIMEOUT }]);
    },
    [removeToast]
  );

  const pauseToast = useCallback((currentToast: IToast) => {
    const pausedAt = new Date().getTime();
    // Elapsed time since last played will be current time - last recorded playedAt
    const elapsedTime = pausedAt - currentToast.playedAt;
    // New remaining time will be previously recorded remainingTime - elapsed time
    const remainingTime = currentToast.remainingTime - elapsedTime;

    // Store pausedAt and remainingTime values
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === currentToast.id ? { ...toast, pausedAt, remainingTime } : toast))
    );
    // Clear the timeout object stored in toast
    clearTimeout(currentToast.timeout);
  }, []);

  const resumeToast = useCallback(
    (currentToast: IToast) => {
      const playedAt = new Date().getTime();
      // Add a timeout to remove the toast after the `remainingTime` on toast
      const timeout = setTimeout(() => removeToast(currentToast.id), currentToast.remainingTime);

      // Store the `playedAt` as current time, timeout object, and remove `pausedAt`
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === currentToast.id ? { ...toast, timeout, playedAt, pausedAt: null } : toast
        )
      );
    },
    [removeToast]
  );

  return { toasts, addToast, pauseToast, removeToast, resumeToast };
};
