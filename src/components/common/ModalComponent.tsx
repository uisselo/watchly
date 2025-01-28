import {
  forwardRef,
  type PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog, type DialogProps } from "@headlessui/react";
import { cn } from "@Utilities";

export type ModalComponentFunctions = {
  open: () => void;
  close: () => void;
};

type Props = PropsWithChildren<
  {
    onChangeVisibility?: (value: boolean) => void;
  } & Omit<DialogProps, "onClose">
>;

const ModalComponent = forwardRef<ModalComponentFunctions, Props>(
  ({ children, onChangeVisibility, className, ...dialogProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      if (onChangeVisibility) onChangeVisibility(isOpen);
    }, [onChangeVisibility, isOpen]);

    const open = () => {
      setIsOpen(true);
    };

    const close = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    return (
      <Dialog
        open={isOpen}
        onClose={close}
        className={cn("absolute inset-0", className)}
        {...dialogProps}
      >
        {children}
      </Dialog>
    );
  },
);

export default ModalComponent;
