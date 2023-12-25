import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  title?: string;
  children: ReactNode;
  description?: string | any;
  onCancel?: () => void;
  onAction?: () => void;
  onActionTitle?: string;
  style?: string;
};

const Alert = (props: Props) => {
  const {
    title,
    onActionTitle,
    description,
    children,
    style,
    onCancel,
    onAction,
  } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger className={style}>{children}</AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black/40">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          {onAction && (
            <AlertDialogAction onClick={onAction}>
              {onActionTitle}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
