import { LucideIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoteButtonProps = {
  icon: "thumbUp" | "thumbDown";
  onClick: () => void;
  count: number;
  isActive: boolean;
  disabled: boolean;
};

const voteButtonIconsMap: Record<VoteButtonProps["icon"], LucideIcon> = {
  thumbUp: ThumbsUpIcon,
  thumbDown: ThumbsDownIcon,
};

export const VoteButton = ({
  icon,
  onClick,
  count,
  isActive,
  disabled,
}: VoteButtonProps) => {
  const Icon = voteButtonIconsMap[icon];

  return (
    <div className="flex gap-1 items-center text-xs">
      <Button variant="ghost" onClick={onClick} disabled={disabled}>
        <Icon size={16} className={cn({ "fill-primary": isActive })} />
      </Button>
      <span>{count}</span>
    </div>
  );
};
