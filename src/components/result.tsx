import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Result({
  isOpen,
  text,
  onOpenChange,
}: {
  isOpen: boolean;
  text: string | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] md:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Result</DialogTitle>
        </DialogHeader>
        <div className="flex">
          <code>{text}</code>
        </div>
      </DialogContent>
    </Dialog>
  );
}
