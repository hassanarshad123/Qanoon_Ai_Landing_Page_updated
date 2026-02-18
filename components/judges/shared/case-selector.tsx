"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { cases } from "@/lib/mock/cases";

interface CaseSelectorProps {
  value?: string;
  onSelect: (caseId: string) => void;
  placeholder?: string;
}

export function CaseSelector({ value, onSelect, placeholder = "Select a case..." }: CaseSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedCase = cases.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left font-normal"
        >
          {selectedCase ? (
            <span className="truncate">{selectedCase.title}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search cases..." />
          <CommandList>
            <CommandEmpty>No case found.</CommandEmpty>
            <CommandGroup>
              {cases.map((c) => (
                <CommandItem
                  key={c.id}
                  value={`${c.title} ${c.number}`}
                  onSelect={() => {
                    onSelect(c.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === c.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2 min-w-0">
                    <Scale className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm truncate">{c.title}</p>
                      <p className="text-xs text-gray-500 font-mono">{c.number}</p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
