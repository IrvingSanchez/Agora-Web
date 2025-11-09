/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/modules/auth/hooks/useAuth'; 
import { Icon } from '@iconify/react';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import type { MenuItemType } from '@/components/sidebar/SidebarMenu';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useModulePermissions } from '@/hooks/useModulePermissions';

// Configuración del menú
const menuItems: MenuItemType[] = [
  {
    id: 'home',
    title: 'Home',
    icon: '',
    path: '/admin',
    type: 'item',
    module: 'Dashboard'
  },
  {
    id: 'users',
    title: 'usuarios',
    icon: '',
    path: '/admin/users',
    type: 'item',
    module: 'Usuarios'
  },
  {
    id: 'projects',
    title: 'Proyectos',
    icon: '',
    path: '/admin/projects',
    type: 'item',
    module: 'Proyectos'
  },
 
  {
    id: 'products',
    title: 'Productos',
    icon: '',
    type: 'dropdown',
    children: [
      // {
      //   id: 'product_list',
      //   title: 'lista de productos',
      //   path: '/admin/product_list',
      //   type: 'item',
      //   icon: '',
      //   module: 'Productos',
      // },
      
    ]
  },
  
];

const LayoutAdmin = () => {
  const { logout, isLoggingOut, sesion } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { moduleIsActive } = useModulePermissions();

  useEffect(() => {
    moduleIsActive(location.pathname, true); // true para redirigir si no tiene permisos
  }, [location, moduleIsActive]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarMenu 
        items={menuItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ">
        <header className="bg-white shadow-sm sticky top-0 z-10 min-h-[60px] flex items-center">
          <nav className="max-w-7xl ml-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between grow">
            {/* Botón para abrir/cerrar sidebar en móvil */}
            <button
              className="md:hidden mr-auto text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-lg p-1"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <Icon icon="mdi:menu" width="24" height="24" />
            </button>

            {/* Perfil y logout */}
            <div className="flex items-center gap-4 ml-auto">
              
             
              <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-lg btn-secondary border-1 px-3 py-1.5 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white ">
                 
                  <p className='text-xl font-semibold'>{sesion.user}</p>
                  <Icon icon="mdi:chevron-down" className="size-8 fill-white/30" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-11 w-60 p-2 px-6 origin-top-center rounded-xl bg-white p-1 text-xl shadow-xl font-semibold transition duration-100 ease-out [--anchor-gap:--spacing(2)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                >
                  <MenuItem>
                    <Link to="/admin/profile" className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-black/5">
                      Editar Perfil
                    </Link>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 px-3 py-1.5 data-focus:bg-black/5"
                      onClick={() => logout()}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? 'Saliendo...' : 'Logout'}

                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
    
            </div>
          </nav>
        </header>

        <main className="flex-1 p-4 md:p-6  mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { LayoutAdmin };