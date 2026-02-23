"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import SavedDesignCard from "@/components/account/SavedDesignCard";
import api from "@/lib/api";

interface SavedDesign {
  id: string;
  name: string;
  type: "kitchen" | "bedroom";
  category: "kitchen" | "bedroom";
  thumbnail: string;
  products: {
    id: string;
    name: string;
    image: string;
  }[];
  colors: {
    name: string;
    hex: string;
  }[];
  estimatedPrice: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

interface SavedDesignsResponse {
  designs: SavedDesign[];
  total: number;
}

export default function SavedDesignsPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<SavedDesignsResponse>({
    queryKey: ["saved-designs"],
    queryFn: async () => {
      const response = await api.get("/user/saved-designs");
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (designId: string) => {
      await api.delete(`/user/saved-designs/${designId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-designs"] });
      toast({
        title: "Design deleted",
        description: "Your saved design has been removed successfully.",
      });
      setDeleteDialogOpen(false);
      setSelectedDesignId(null);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete design. Please try again.",
        variant: "error",
      });
    },
  });

  const shareMutation = useMutation({
    mutationFn: async (designId: string) => {
      const response = await api.post(`/user/saved-designs/${designId}/share`);
      return response.data;
    },
    onSuccess: (data) => {
      navigator.clipboard.writeText(data.shareUrl);
      toast({
        title: "Link copied",
        description: "Share link has been copied to clipboard.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate share link. Please try again.",
        variant: "error",
      });
    },
  });

  const handleDelete = (designId: string) => {
    setSelectedDesignId(designId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDesignId) {
      deleteMutation.mutate(selectedDesignId);
    }
  };

  const handleShare = (designId: string) => {
    shareMutation.mutate(designId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
        <p className="text-destructive">
          Failed to load saved designs. Please try again later.
        </p>
      </div>
    );
  }

  const designs = data?.designs || [];

  if (designs.length === 0) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={Plus}
          title="No saved designs yet"
          description="Start creating your dream kitchen or bedroom design and save it here for easy access."
        />
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/kitchen">Design Kitchen</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/bedroom">Design Bedroom</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Saved Designs
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and view your saved kitchen and bedroom designs
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {data?.total || 0} {data?.total === 1 ? "Design" : "Designs"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designs.map((design) => (
          <SavedDesignCard
            key={design.id}
            design={design}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete saved design?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              saved design and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}