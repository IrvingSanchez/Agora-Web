import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import type { MenuItemType } from './SidebarMenu';

interface MenuItemProps {
  item: MenuItemType;
  currentPath: string;
  isVisible: boolean;
}

const MenuItem = ({ item, currentPath, isVisible }: MenuItemProps) => {
  const isActive = currentPath === item.path;

  if (!isVisible) {
    return null;
  }

  return (
    <Link
      to={item.path || '#'}
      className={`
        flex items-center gap-2 px-4 py-4 my-4
        hover:bg-gray-100 transition-colors  rounded-lg 
        ${isActive ? 'bg-gray-100' : ''}
      `}
    >
      {item.icon && (
        <Icon icon={item.icon} width="20" height="20" />
      )}
      <span>{item.title}</span>
    </Link>
  );
};

export default MenuItem;