/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import MenuItem from './MenuItem';
import type { MenuItemType } from './SidebarMenu';
import { checkModulePermissions } from '@/hooks/useModulePermissions';

interface MenuDropdownProps {
  item: MenuItemType;
  currentPath: string;
}

const MenuDropdown = ({ item, currentPath }: MenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveChild = item.children?.some(child => child.path === currentPath);

  const moduleIsActive = (module:any): any => {
    return checkModulePermissions(module);
  }

  useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  return (
    <div className="relative">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full font-semibold flex items-center justify-between px-4 py-4 my-2
          hover:bg-gray-100 transition-colors  rounded-lg 
          ${hasActiveChild ? 'bg-gray-100' : ''}
        `}
      >
        <div className="flex items-center gap-2">
          {item.icon && (
            <Icon icon={item.icon} width="20" height="20" />
          )}
          <span>{item.title}</span>
        </div>
        <Icon
          icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          width="20"
          height="20"
        />
      </button>

      {/* Dropdown Content */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? '' : 'max-h-0'}
        `}
      >
        <div className=" ml-4">
          {item.children?.map(child => (
            <MenuItem
              key={child.id}
              item={child}
              currentPath={currentPath}
              isVisible={moduleIsActive(child.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;