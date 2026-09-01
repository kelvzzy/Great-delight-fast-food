'use client';

interface GiftCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function GiftCheckbox({ checked, onChange }: GiftCheckboxProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
      <input
        type="checkbox"
        id="gift-order"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border-purple-400 text-purple-600 focus:ring-purple-500 cursor-pointer"
      />
      <label htmlFor="gift-order" className="flex-1 cursor-pointer">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎁</span>
          <div>
            <div className="font-bold text-gray-900 dark:text-gray-100">
              Send as a Gift
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Send this order to a friend via WhatsApp
            </div>
          </div>
        </div>
      </label>
    </div>
  );
}
