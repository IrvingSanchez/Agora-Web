/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import MenuItem from '@/components/sidebar/MenuItem';
import MenuDropdown from '@/components/sidebar/MenuDropdown';
import { checkModulePermissions } from '@/hooks/useModulePermissions';
import { Icon } from '@iconify/react';

export interface MenuItemType {
  id: string;
  title: string;
  icon?: string;
  path?: string;
  module?: string;
  type: 'item' | 'dropdown';
  children?: MenuItemType[];
  permission?: string;
}

interface SidebarMenuProps {
  items: MenuItemType[];
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu = ({ items, isOpen, onClose }: SidebarMenuProps) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const moduleIsActive = (module:any): any => {
    return checkModulePermissions(module);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar el menú en móvil cuando cambia la ruta
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname]);

  const sidebarClasses = `fixed  md:sticky md:top-0 h-full min-h-screen bg-(--text-light) font-semibold text-[1.4rem] transition-all duration-300 ease-in-out ${
    isMobile ? `w-130 ${isOpen ? 'left-0' : '-left-130'} z-50` : 'w-1/5 min-w-[250px]'
  }`;

  const overlayClasses = `fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
    isOpen && isMobile ? 'opacity-40 visible' : 'opacity-0 invisible'
  }`;

  return (
    <>
      {/* Overlay para móvil */}
      <div 
        className={overlayClasses} 
        onClick={onClose}
        role="presentation"
        aria-hidden={!isOpen}
      />

      {/* Sidebar */}
      <aside 
        className={sidebarClasses}
        role="navigation"
        aria-label="Menú principal"
      >
        {/* Logo o título */}
        <div className="p-4 border-b border-gray-700 flex  min-h-[60px] flex items-center justify-center">
          <div className="flex flex-wrap grow justify-start items-center gap-2">
            <p className='text-(--primary-color) text-3xl'>Agora</p>
            
              
              {(() => {
                // Buscar en items principales
                const currentItem = items.find(item => item.path === location.pathname);
                if (currentItem) {
                  return <p className=' py-2 px-4 px-2  text-xl font-medium'>{currentItem.module}</p>;
                }
                
                // Buscar en children de items con dropdown
                for (const item of items) {
                  if (item.children) {
                    const currentChild = item.children.find(child => child.path === location.pathname);
                    if (currentChild) {
                      return <p className=' py-2 px-4 px-2  text-xl font-medium'>{currentChild.module}</p>;
                    }
                  }
                }
                
                return null;
              })()}
           
          </div>
          {/* Botón cerrar en móvil */}
          {isMobile && (
            <button
              onClick={onClose}
              className="font-semibold text-[1.4rem] hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg p-1"
              aria-label="Cerrar menú"
            >
              <Icon icon="mdi:close" width="24" height="24" />
            </button>
          )}
        </div>

        {/* Menú */}
        <nav className="py-4 overflow-y-auto h-[calc(100vh-60px)]" aria-label="Menú de navegación">
          
          
          {items.map((item) => (
            item.type === 'dropdown' ? (
              <MenuDropdown 
                key={item.id} 
                item={item} 
                currentPath={location.pathname}
                
              />
            ) : (
              <MenuItem 
                key={item.id} 
                item={item} 
                currentPath={location.pathname}
                isVisible={moduleIsActive(item.path)}
              />
            )
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SidebarMenu;