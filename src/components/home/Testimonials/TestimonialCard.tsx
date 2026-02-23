import { Quote, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card 
      className="group relative h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Quote Icon Background */}
      <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
        <Quote className="w-24 h-24 text-primary" strokeWidth={1} />
      </div>

      <CardContent className="relative p-6 md:p-8 flex flex-col h-full">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <blockquote className="flex-1 mb-6">
          <p className="text-gray-700 leading-relaxed text-base md:text-lg italic">
            "{testimonial.comment}"
          </p>
        </blockquote>

        {/* Project Info */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <p className="text-sm font-medium text-primary">
            {testimonial.project}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(testimonial.date)}
          </p>
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(testimonial.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-lg font-bold text-gray-900 truncate group-hover:text-primary transition-colors">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-600 truncate">
              {testimonial.location}
            </p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardContent>
    </Card>
  );
}