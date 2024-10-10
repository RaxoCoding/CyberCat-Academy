"use client"

import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  placeholder: string;
  setSearch: (value: string) => void;
}

export function SearchBar({ placeholder, setSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearch(searchValue);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, setSearch])
 
  return (
    <input
      type="search"
      onChange={(e) => setSearchValue(e.target.value)}
      className="w-full flex-grow px-3 py-2 border rounded-md bg-secondary text-secondary-foreground my-4"
      placeholder={placeholder}
    />
  );
}