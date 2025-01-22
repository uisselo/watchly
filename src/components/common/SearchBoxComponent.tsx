import { Input, type InputProps } from "@headlessui/react";
import { cn } from "@Utilities";

function SearchBoxComponent({ className, ...props }: InputProps) {
  return (
    <Input
      className={cn("input-box data-[focus]:outline-none", className)}
      placeholder="Search"
      {...props}
    />
  );
}

export default SearchBoxComponent;
