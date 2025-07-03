import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
};

export function PaginationControls({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: Props) {
  return (
    <div className="flex flex-row gap-10 mt-5">
      <Button onClick={onPrev} disabled={!hasPrev}>
        <ArrowLeft />
        Last page
      </Button>
      <Button onClick={onNext} disabled={!hasNext}>
        Next page
        <ArrowRight />
      </Button>
    </div>
  );
}
