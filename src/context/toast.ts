import { createContext } from 'react';

import { ToastOptions } from 'src/types/toast';

const ToastContext = createContext({
  add: (options: ToastOptions) => {},
});

export default ToastContext;
