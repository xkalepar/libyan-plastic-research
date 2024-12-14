"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ResponsiveDialogWithCustomOpenFuncionality } from "./responsive-dialog";
import { toast } from "@/hooks/use-toast";
import SubmitButton from "./submit-button";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";

type Action = (
  prevState: { message: string },
  formData: FormData
) => Promise<{ message: string }>;

interface Props {
  action: Action;
  className?: string;
  children: ReactNode;
  success?: string;
  replaceLink?: string;
  trigger: ReactNode;
  title?: string;
  description?: string;
  dontReplace?: boolean;
  stopClosing?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  submit: ReactNode | string;
  submitClass?: string;
}
const AccessibleDialogForm = ({
  action,
  className,
  children,
  success = "تمت العملية بنجاح",
  replaceLink = "/",
  trigger,
  title,
  description,
  dontReplace = false,
  stopClosing = false,
  open,
  setOpen,
  submit,
  submitClass,
}: Props) => {
  const router = useRouter();
  const [msg, dispatch, isPending] = useActionState(action, { message: "" });

  // Close dialog after submission
  const toggleOpen = () => {
    if (!stopClosing) {
      console.log("Toggling open state from:", open, "to:", !open);
      setOpen(!open); // Ensure this updates the parent state
    }
  };

  useEffect(() => {
    if (!msg.message) return;
    toast({ title: msg.message });
    if (msg.message === success) {
      if (!dontReplace) router.replace(replaceLink);
      // toggleOpen(); // Close dialog on success
    }
    toggleOpen(); // Close dialog on success
  }, [msg, success, replaceLink, dontReplace, router]);

  return (
    <ResponsiveDialogWithCustomOpenFuncionality
      trigger={trigger}
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
    >
      <form action={dispatch} className={cn(className)}>
        {children}
        <DialogFooter className="gap-2 mt-2 phone-only:hidden">
          <Button
            variant={"destructive"}
            type="button"
            onClick={() => {
              setOpen(!open);
            }}
          >
            تجاهل
          </Button>
          <SubmitButton pending={isPending}>انشاء</SubmitButton>
        </DialogFooter>
        <SubmitButton
          className={cn("hidden phone-only:flex", submitClass)}
          pending={isPending}
        >
          {submit}
        </SubmitButton>
      </form>
    </ResponsiveDialogWithCustomOpenFuncionality>
  );
};

export default AccessibleDialogForm;
