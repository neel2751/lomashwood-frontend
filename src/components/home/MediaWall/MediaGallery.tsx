'use client';

import { Play, Clock } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title: string;
  category: 'kitchen' | 'bedroom' | 'both';
  description?: string;
  duration?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  viewMode: 'grid' | 'list';
  onMediaClick: (index: number) => void;
}

const categoryColors = {
  kitchen: 'bg-orange-100 text-orange-700',
  bedroom: 'bg-purple-100 text-purple-700',
  both: 'bg-blue-100 text-blue-700',
};

const categoryLabels = {
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  both: 'Both',
};

export default function MediaGallery({ items, viewMode, onMediaClick }: MediaGalleryProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No media items found for the selected category.</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card
            key={item.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onMediaClick(index)}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-64 h-48 sm:h-auto bg-gray-100 shrink-0">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                />

                {/* Video Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4">
                      <Play className="h-8 w-8 text-primary fill-primary" />
                    </div>
                  </div>
                )}

                {/* Duration Badge */}
                {item.type === 'video' && item.duration && (
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/70 text-white border-0">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.duration}
                    </Badge>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="secondary"
                    className={`${categoryColors[item.category]} font-medium`}
                  >
                    {categoryLabels[item.category]}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {item.type === 'image' ? 'Photo' : 'Video'}
                  </Badge>
                </div>
                {item.description && (
                  <p className="text-gray-600 line-clamp-2">{item.description}</p>
                )}
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <Card
          key={item.id}
          className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => onMediaClick(index)}
        >
          {/* Thumbnail */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Video Overlay */}
            {item.type === 'video' && (
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="bg-white/90 group-hover:bg-white rounded-full p-3 group-hover:p-4 transition-all">
                  <Play className="h-6 w-6 text-primary fill-primary" />
                </div>
              </div>
            )}

            {/* Duration Badge */}
            {item.type === 'video' && item.duration && (
              <div className="absolute bottom-3 right-3">
                <Badge variant="secondary" className="bg-black/70 text-white border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.duration}
                </Badge>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className={`${categoryColors[item.category]} font-medium`}
              >
                {categoryLabels[item.category]}
              </Badge>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                {item.title}
              </h3>
              <Badge variant="outline" className="ml-2 shrink-0 text-xs">
                {item.type === 'image' ? 'Photo' : 'Video'}
              </Badge>
            </div>
            {item.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}