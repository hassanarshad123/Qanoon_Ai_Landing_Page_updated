"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Trash2,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { getNoteById, getFolders, getTags } from "@/lib/mock/api";
import type { Note, Folder, Tag } from "@/lib/mock/types";

function getSourceHref(note: Note): string | null {
  if (!note.sourceId || !note.sourceType) return null;
  switch (note.sourceType) {
    case "brief":
      return `/judges/brief/${note.sourceId}`;
    case "judgment":
      return `/judges/judgments/${note.sourceId}`;
    case "research":
      return `/judges/research/${note.sourceId}`;
    default:
      return null;
  }
}

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [note, setNote] = useState<Note | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [noteTags, setNoteTags] = useState<string[]>([]);
  const [showTagPicker, setShowTagPicker] = useState(false);

  useEffect(() => {
    getNoteById(id).then((data) => {
      if (data) {
        setNote(data);
        setTitle(data.title);
        setSelectedFolder(data.folder);
        setNoteTags(data.tags);
      }
    });
    getFolders().then(setFolders);
    getTags().then(setAllTags);
  }, [id]);

  const tagMap = allTags.reduce<Record<string, Tag>>((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {});

  const availableTags = allTags.filter((t) => !noteTags.includes(t.id));

  const removeTag = (tagId: string) => {
    setNoteTags((prev) => prev.filter((t) => t !== tagId));
    toast.success("Tag removed");
  };

  const addTag = (tagId: string) => {
    setNoteTags((prev) => [...prev, tagId]);
    setShowTagPicker(false);
    toast.success("Tag added");
  };

  const handleDelete = () => {
    toast.success("Note deleted");
    router.push("/judges/notes");
  };

  const handlePrint = () => {
    window.print();
  };

  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );
  }

  const sourceHref = getSourceHref(note);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        href="/judges/notes"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Notes
      </Link>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Note</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this note? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Separator />

      {/* Note Content Card */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Editable Title */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-serif text-2xl font-bold border-none shadow-none px-0 focus-visible:ring-0 text-gray-900 h-auto"
            placeholder="Note title..."
          />

          {/* Folder Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">Folder:</span>
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.name}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags Editor */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-gray-500">Tags:</span>
            <div className="flex flex-wrap items-center gap-2">
              {noteTags.map((tagId) => {
                const tag = tagMap[tagId];
                if (!tag) return null;
                return (
                  <Badge
                    key={tagId}
                    variant="secondary"
                    className={`${tag.color} cursor-pointer group`}
                    onClick={() => removeTag(tagId)}
                  >
                    {tag.name}
                    <X className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Badge>
                );
              })}

              {/* Add Tag Button / Picker */}
              {showTagPicker ? (
                <div className="flex flex-wrap items-center gap-1 p-2 rounded-md border bg-gray-50">
                  {availableTags.length > 0 ? (
                    availableTags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-200 transition-colors"
                        onClick={() => addTag(tag.id)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        {tag.name}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      All tags applied
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => setShowTagPicker(false)}
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => setShowTagPicker(true)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Tag
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Note Content */}
          <div className="prose prose-gray max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-[15px]">
              {note.content}
            </div>
          </div>

          {/* Source Link */}
          {note.sourceLabel && sourceHref && (
            <>
              <Separator />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">From:</span>
                <Link
                  href={sourceHref}
                  className="inline-flex items-center gap-1.5 text-sm text-[#A21CAF] hover:text-[#A21CAF]/80 font-medium transition-colors"
                >
                  {note.sourceLabel}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </>
          )}

          {/* Timestamps */}
          <div className="flex items-center gap-4 pt-2 text-xs text-gray-400">
            <span>
              Created:{" "}
              {new Date(note.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>
              Last updated:{" "}
              {new Date(note.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
