import React from 'react';
import { Tag } from 'lucide-react';

interface ChallengeTagProps {
  tag: string;
  onClick?: () => void;
  isSelected?: boolean;
  alwaysPrimary?: boolean;
}

export function ChallengeTag({ tag, onClick, isSelected = false, alwaysPrimary = false }: ChallengeTagProps) {
  return (
    <span
      onClick={onClick}
      className={`flex items-center text-xs px-2 py-1 rounded-full truncate cursor-pointer transition-colors ${
        isSelected || alwaysPrimary
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-primary-foreground'
      }`}
    >
      <Tag className="w-3 h-3 mr-1" />
      {tag}
    </span>
  );
}