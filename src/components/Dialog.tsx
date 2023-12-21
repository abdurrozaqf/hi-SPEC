import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  children: ReactNode;
  description?: string | any;
  onCancel?: () => {};
  onAction?: () => {};
  action?: string;
};

const CustomDialog = (props: Props) => {
  const { children, title, description, onCancel, onAction, action } = props;

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="dark:bg-black/40">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {onCancel && <Button onClick={onCancel}>Cancel</Button>}
          {onAction && <Button onClick={onAction}>{action}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
