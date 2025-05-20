
import * as React from "react";
import {
  Toast,
  dispatch,
  ActionTypes,
  State,
  listeners,
  memoryState,
  genId,
  addToRemoveQueue
} from "./toast-store";

type ToastProps = Omit<Toast, "id" | "open"> & { id?: string };

export function toast({ ...props }: ToastProps) {
  const id = props.id || genId();

  const update = (props: Partial<Toast>) =>
    dispatch({
      type: ActionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });
  
  const dismiss = () => {
    dispatch({ type: ActionTypes.DISMISS_TOAST, toastId: id });
  };

  dispatch({
    type: ActionTypes.ADD_TOAST,
    toast: {
      ...props,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: ActionTypes.DISMISS_TOAST, toastId }),
  };
}

export type { Toast };
