
import * as React from "react";

export type ToastVariant = "default" | "destructive" | "success";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open: boolean;
  variant?: ToastVariant;
  onOpenChange?: (open: boolean) => void;
};

// Constants
export const TOAST_LIMIT = 5;
export const TOAST_REMOVE_DELAY = 10000; // 10 seconds (10000ms)

// Action types
export const ActionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

export type State = {
  toasts: Toast[];
};

// Action definitions
export type Action =
  | {
      type: typeof ActionTypes.ADD_TOAST;
      toast: Omit<Toast, "id">;
    }
  | {
      type: typeof ActionTypes.UPDATE_TOAST;
      toast: Partial<Toast> & { id: string };
    }
  | {
      type: typeof ActionTypes.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: typeof ActionTypes.REMOVE_TOAST;
      toastId?: string;
    };

// ID generation for toasts
let count = 0;
export function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

// Toast timeouts tracking
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// State reducer
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [
          ...state.toasts,
          { id: genId(), ...action.toast, open: true },
        ].slice(0, TOAST_LIMIT),
      };

    case ActionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case ActionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case ActionTypes.REMOVE_TOAST:
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// Store implementation
export const listeners: Array<(state: State) => void> = [];
export let memoryState: State = { toasts: [] };

export function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function addToRemoveQueue(toastId: string) {
  // Clear existing timeout for this toast if it exists
  if (toastTimeouts.has(toastId)) {
    clearTimeout(toastTimeouts.get(toastId));
    toastTimeouts.delete(toastId);
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: ActionTypes.REMOVE_TOAST,
      toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}
