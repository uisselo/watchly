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

/**
 * A reusable modal component built with Headless UI.
 *
 * @param children - The content to be displayed inside the modal.
 * @param onChangeVisibility - Callback function triggered when the modal's visibility changes.
 * @param className - Additional class names for styling the modal.
 * @param dialogProps - Additional props passed to the `Dialog` component.
 *
 * @returns A modal component that can be controlled via a ref.
 */
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
        className={cn("fixed inset-0 overflow-y-scroll", className)}
        {...dialogProps}
      >
        {children}
      </Dialog>
    );
  },
);

export default ModalComponent;
