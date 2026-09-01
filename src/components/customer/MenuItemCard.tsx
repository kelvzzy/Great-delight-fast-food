'use client';

import { useState } from 'react';
import { formatNaira } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface MenuVariant {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

interface MenuOptionValue {
  id: string;
  name: string;
  priceModifier: number;
  available: boolean;
}

interface MenuOption {
  id: string;
  name: string;
  required: boolean;
  values: MenuOptionValue[];
}

interface MenuItem {
  id: string;
  name: string;
  description?: string | null;
  basePrice?: number | null;
  image?: string | null;
  available: boolean;
  variants: MenuVariant[];
  options: MenuOption[];
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: {
    menuItemId: string;
    name: string;
    basePrice: number | null;
    quantity: number;
    variantId?: string;
    variantName?: string;
    variantPrice?: number;
    options: Array<{
      optionId: string;
      optionName: string;
      valueId: string;
      valueName: string;
      priceModifier: number;
    }>;
  }) => void;
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    item.variants.length > 0 ? item.variants[0]?.id : undefined
  );
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const hasVariants = item.variants.length > 0;
  const hasOptions = item.options.length > 0;

  const selectedVariant = item.variants.find((v) => v.id === selectedVariantId);
  
  // Calculate current price
  const getCurrentPrice = () => {
    let price = 0;
    
    if (selectedVariant) {
      price = selectedVariant.price;
    } else if (item.basePrice !== null && item.basePrice !== undefined) {
      price = item.basePrice;
    }
    
    // Add option modifiers
    Object.entries(selectedOptions).forEach(([optionId, valueId]) => {
      const option = item.options.find((o) => o.id === optionId);
      const value = option?.values.find((v) => v.id === valueId);
      if (value) {
        price += value.priceModifier;
      }
    });
    
    return price;
  };

  const handleAddToCart = () => {
    const cartOptions = Object.entries(selectedOptions).map(([optionId, valueId]) => {
      const option = item.options.find((o) => o.id === optionId);
      const value = option?.values.find((v) => v.id === valueId);
      
      return {
        optionId,
        optionName: option?.name || '',
        valueId,
        valueName: value?.name || '',
        priceModifier: value?.priceModifier || 0,
      };
    });

    onAddToCart({
      menuItemId: item.id,
      name: item.name,
      basePrice: item.basePrice ?? null,
      quantity,
      variantId: selectedVariantId,
      variantName: selectedVariant?.name,
      variantPrice: selectedVariant?.price,
      options: cartOptions,
    });

    // Reset selections
    setQuantity(1);
  };

  if (!item.available) {
    return (
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 opacity-75 border-2 border-gray-300 overflow-hidden">
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl shadow-lg">
          SOLD OUT
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-600">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const canAddToCart = !hasVariants || selectedVariantId;

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200 relative overflow-hidden">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-red-50/0 group-hover:from-orange-50/50 group-hover:to-red-50/30 transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative space-y-5">
        {/* Item Info */}
        <div>
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-700 transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
              {item.description}
            </p>
          )}
          {currentPrice > 0 && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                {formatNaira(currentPrice)}
              </span>
              <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                per item
              </span>
            </div>
          )}
        </div>

        {/* Variants */}
        {hasVariants && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Choose Size
            </label>
            <div className="space-y-2">
              {item.variants.map((variant) => (
                <label
                  key={variant.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedVariantId === variant.id
                      ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-md scale-[1.02]'
                      : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                  } ${!variant.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`variant-${item.id}`}
                      value={variant.id}
                      checked={selectedVariantId === variant.id}
                      onChange={() => setSelectedVariantId(variant.id)}
                      disabled={!variant.available}
                      className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{variant.name}</div>
                      {!variant.available && (
                        <div className="text-xs text-red-600 font-semibold">Unavailable</div>
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-lg text-gray-900">
                    {formatNaira(variant.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Options */}
        {hasOptions && item.options.map((option) => (
          <div key={option.id} className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {option.name} {option.required && <span className="text-red-600">*</span>}
            </label>
            <div className="space-y-2">
              {option.values.map((value) => (
                <label
                  key={value.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOptions[option.id] === value.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!value.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`option-${option.id}`}
                      value={value.id}
                      checked={selectedOptions[option.id] === value.id}
                      onChange={() =>
                        setSelectedOptions((prev) => ({
                          ...prev,
                          [option.id]: value.id,
                        }))
                      }
                      disabled={!value.available}
                      className="w-4 h-4 text-primary-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{value.name}</div>
                      {!value.available && (
                        <div className="text-xs text-red-600">Unavailable</div>
                      )}
                    </div>
                  </div>
                  {value.priceModifier !== 0 && (
                    <span className="text-sm font-semibold text-gray-700">
                      +{formatNaira(value.priceModifier)}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-3 pt-3">
          <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-5 py-3 font-bold text-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              −
            </button>
            <span className="px-6 py-3 font-bold text-lg bg-gray-50 min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-5 py-3 font-bold text-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold text-lg py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
