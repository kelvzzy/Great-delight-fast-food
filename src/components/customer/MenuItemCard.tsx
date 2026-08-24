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
      <div className="bg-gray-100 rounded-lg p-4 opacity-60">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-gray-500">{item.name}</h3>
            {item.description && (
              <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            )}
          </div>
          <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
            Sold Out
          </span>
        </div>
      </div>
    );
  }

  const currentPrice = getCurrentPrice();
  const canAddToCart = !hasVariants || selectedVariantId;

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="space-y-4">
        {/* Item Info */}
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          )}
          {currentPrice > 0 && (
            <p className="text-xl font-bold text-primary-700 mt-2">
              {formatNaira(currentPrice)}
            </p>
          )}
        </div>

        {/* Variants */}
        {hasVariants && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Option</label>
            <div className="space-y-2">
              {item.variants.map((variant) => (
                <label
                  key={variant.id}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedVariantId === variant.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
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
                      className="w-4 h-4 text-primary-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{variant.name}</div>
                      {!variant.available && (
                        <div className="text-xs text-red-600">Unavailable</div>
                      )}
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">
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
        <div className="flex items-center gap-3 pt-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 rounded-l-lg"
            >
              −
            </button>
            <span className="px-6 py-2 font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 rounded-r-lg"
            >
              +
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
