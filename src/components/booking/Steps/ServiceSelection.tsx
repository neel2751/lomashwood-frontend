'use client';

import {
  ChefHat,
  Bed,
  Maximize2,
  Palette,
  Ruler,
  Home,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface ServiceOption {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

interface AdditionalService {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'kitchen',
    label: 'Kitchen Only',
    description: 'Complete kitchen design and consultation',
    icon: <ChefHat className="h-6 w-6" />,
    popular: true,
  },
  {
    id: 'bedroom',
    label: 'Bedroom Only',
    description: 'Complete bedroom design and consultation',
    icon: <Bed className="h-6 w-6" />,
  },
  {
    id: 'both',
    label: 'Kitchen & Bedroom',
    description: 'Comprehensive home design solution',
    icon: <Home className="h-6 w-6" />,
    popular: true,
  },
];

const additionalServices: AdditionalService[] = [
  {
    id: 'space_planning',
    label: 'Space Planning',
    description: 'Optimize your room layout for maximum functionality',
    icon: <Maximize2 className="h-4 w-4" />,
  },
  {
    id: 'color_consultation',
    label: 'Color Consultation',
    description: 'Expert advice on color schemes and finishes',
    icon: <Palette className="h-4 w-4" />,
  },
  {
    id: 'measurements',
    label: 'Professional Measurements',
    description: 'Accurate on-site measurements for perfect fit',
    icon: <Ruler className="h-4 w-4" />,
  },
];

export default function ServiceSelection() {
  const { setValue, watch } = useFormContext();

  // ✅ FIX 1: was watch('service'), must match schema field name 'serviceType'
  const selectedService            = watch('serviceType');
  const selectedAdditionalServices = watch('additionalServices') || [];
  const [showAdditional, setShowAdditional] = useState(false);
  const [showTooltip, setShowTooltip]       = useState(false);

  const handleServiceChange = (value: string) => {
    // ✅ FIX 2: was setValue('service', value) — wrong field name
    // FIX 3: schema defines serviceType as z.array(z.string()), so wrap in array
    setValue('serviceType', [value], { shouldValidate: true });
    setShowAdditional(true);
  };

  const handleAdditionalServiceToggle = (serviceId: string) => {
    const current = selectedAdditionalServices as string[];
    const updated = current.includes(serviceId)
      ? current.filter((id: string) => id !== serviceId)
      : [...current, serviceId];
    setValue('additionalServices', updated, { shouldValidate: true });
  };

  const isAdditionalServiceSelected = (serviceId: string) => {
    return (selectedAdditionalServices as string[]).includes(serviceId);
  };

  // ✅ FIX 4: serviceType is now an array, so check first element for selected display
  const selectedServiceId = Array.isArray(selectedService) ? selectedService[0] : selectedService;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Select Your Service</h2>
          <p className="text-gray-600 mt-1">
            Choose the service that best fits your needs
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {serviceOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleServiceChange(option.id)}
              className="text-left"
            >
              <Card
                className={`relative transition-all hover:shadow-md ${
                  selectedServiceId === option.id
                    ? 'ring-2 ring-primary border-primary'
                    : 'border-gray-200'
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  {option.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-primary" variant="default">
                      Popular
                    </Badge>
                  )}

                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${
                      selectedServiceId === option.id
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.icon}
                    </div>
                    {selectedServiceId === option.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {showAdditional && (
        <>
          <Separator />

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Additional Services</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Enhance your consultation with these optional services
                </p>
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Info className="h-4 w-4" />
                </Button>
                {showTooltip && (
                  <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-md border bg-popover p-3 text-sm text-popover-foreground shadow-md">
                    These services are optional and can be added to your consultation
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              {additionalServices.map((service) => (
                <Card
                  key={service.id}
                  className={`transition-all cursor-pointer hover:shadow-md ${
                    isAdditionalServiceSelected(service.id)
                      ? 'ring-2 ring-primary/50 border-primary/50 bg-primary/5'
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleAdditionalServiceToggle(service.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        id={service.id}
                        checked={isAdditionalServiceSelected(service.id)}
                        onCheckedChange={() => handleAdditionalServiceToggle(service.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          isAdditionalServiceSelected(service.id)
                            ? 'bg-primary/10 text-primary'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {service.icon}
                        </div>
                        <div className="space-y-1 flex-1">
                          <label
                            htmlFor={service.id}
                            className="font-medium text-gray-900 cursor-pointer text-sm"
                          >
                            {service.label}
                          </label>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      {isAdditionalServiceSelected(service.id) && (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedServiceId && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900">Your Selection</h4>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">
                    {serviceOptions.find(opt => opt.id === selectedServiceId)?.label}
                  </span>
                  {selectedAdditionalServices.length > 0 && (
                    <span>
                      {' '}+ {selectedAdditionalServices.length} additional service
                      {selectedAdditionalServices.length > 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}