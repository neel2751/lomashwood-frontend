import Image from 'next/image';
import React from 'react';

interface InspirationHeroProps {
    title: string;
    description?: string;
    imageUrl?: string;
    backgroundImage?: string;
    category?: string;
    subtitle?: string;
}

const InspirationHero: React.FC<InspirationHeroProps> = ({
    title,
    description,
    imageUrl,
    backgroundImage,
    category,
    subtitle,
}) => {
    return (
        <section 
            className="relative h-[500px] flex items-center justify-center"
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
            {backgroundImage && (
                <div className="absolute inset-0 bg-black/40" />
            )}
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {imageUrl && (
                        <Image
                            src={imageUrl} 
                            alt={title}
                            className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                    )} 
                      <div className="mb-4">
                        <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                            {category}
                        </span>
                    </div>    
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        {title}
                    </h1>
                  
                    {subtitle && (
                        <p className="text-lg md:text-xl text-white/90">
                            {subtitle}
                        </p>
                    )}
                    {description && (
                        <p className="text-lg md:text-xl text-white/90">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default InspirationHero;