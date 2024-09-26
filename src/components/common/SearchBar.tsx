import React from 'react';
import { Search } from 'lucide-react'
import { Input } from '../ui/input';

interface SearchBarProps {
  placeholder: string;
  setSearch: (value: string) => void;
}

export function SearchBar({ placeholder, setSearch }: SearchBarProps) {
  return (
    <input
      type="search"
      onChange={(e) => setSearch(e.target.value)}
      className="w-full flex-grow px-3 py-2 border rounded-md bg-secondary text-secondary-foreground my-4"
      placeholder={placeholder}
    />
  );
}