import { createContext, useContext } from 'react';

import { ToastOptions } from 'src/types/toast';

export const ToastContext = createContext({
  add: (options: ToastOptions) => {},
});

export const useToast = () => useContext(ToastContext);
