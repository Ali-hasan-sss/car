import React from "react";
import Link from "next/link";

interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  path: string;
}

interface BottomNavBarProps {
  items: BottomNavItem[];
}

export default function BottomNavBar({ items }: BottomNavBarProps) {
  return (
    <div className="fixed bottom-0 z-50 w-full md:hidden -translate-x-1/2 bg-secondary1 border-t border-gray-200 left-1/2">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <Link
              href={item.path}
              data-tooltip-target={`tooltip-${index}`}
              className="inline-flex flex-col items-center justify-center p-4 hover:bg-white group"
            >
              <div className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600">
                {item.icon}
              </div>
              <span className="sr-only">{item.label}</span>
            </Link>
            <div
              id={`tooltip-${index}`}
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              {item.tooltip}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
