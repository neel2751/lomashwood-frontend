import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Share2,
  Calendar,
  Palette,
  Sofa,
  ChefHat
} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatters';

interface SavedDesign {
  id: string;
  name: string;
  type: 'kitchen' | 'bedroom';
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  products: {
    id: string;
    name: string;
    image: string;
  }[];
  colors: {
    name: string;
    hex: string;
  }[];
  style?: string;
  estimatedPrice?: number;
  notes?: string;
}

interface SavedDesignCardProps {
  design: SavedDesign;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDownload?: (id: string) => void;
  onShare?: (id: string) => void;
  className?: string;
}

export default function SavedDesignCard({
  design,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onShare,
  className,
}: SavedDesignCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(design.id);
    }
    setShowDeleteDialog(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kitchen':
        return <ChefHat className="h-4 w-4" />;
      case 'bedroom':
        return <Sofa className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'kitchen':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'bedroom':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <Card className={cn('group overflow-hidden hover:shadow-lg transition-shadow', className)}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={design.thumbnail || '/images/placeholder.jpg'}
            alt={design.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge className={cn('capitalize', getTypeColor(design.type))}>
              {getTypeIcon(design.type)}
              <span className="ml-1">{design.type}</span>
            </Badge>
            {design.style && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                {design.style}
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (
                  <DropdownMenuItem onClick={() => onView(design.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Design
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(design.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Design
                  </DropdownMenuItem>
                )}
                {onDownload && (
                  <DropdownMenuItem onClick={() => onDownload(design.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                )}
                {onShare && (
                  <DropdownMenuItem onClick={() => onShare(design.id)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {design.colors && design.colors.length > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1.5">
              <Palette className="h-3.5 w-3.5 text-gray-600" />
              <div className="flex gap-1">
                {design.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
                {design.colors.length > 3 && (
                  <div className="h-4 w-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] text-gray-600">
                      +{design.colors.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{design.name}</h3>
          
          {design.notes && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {design.notes}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(design.updatedAt)}</span>
            </div>
            {design.products && design.products.length > 0 && (
              <div className="flex items-center gap-1">
                <span className="font-medium text-foreground">
                  {design.products.length}
                </span>
                <span>Products</span>
              </div>
            )}
          </div>

          {design.estimatedPrice && (
            <div className="text-sm">
              <span className="text-muted-foreground">Estimated Price: </span>
              <span className="font-semibold text-lg">
                ₹{design.estimatedPrice.toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onView && onView(design.id)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            className="flex-1"
            onClick={() => onEdit && onEdit(design.id)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Saved Design</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{design.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}