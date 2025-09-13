import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Button } from '../Button/Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmDialog = ({ isOpen, onClose }: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={() => onClose()} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-3xl flex flex-col items-center">
          <DialogTitle className="font-semibold text-2xl/8">
            Reservation places successfully!
          </DialogTitle>
          <Description className="font-medium mb-10">
            Our manager will contact you soon.
          </Description>
          <Button onClick={() => onClose()}>Okay</Button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
