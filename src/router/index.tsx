
import { createBrowserRouter, redirect, type LoaderFunction } from 'react-router-dom';

import { LayoutAuth } from '@/layouts/LayoutAuth';
import { LayoutAdmin } from '@/layouts/LayoutAdmin';
import LoginView from '@/views/LoginView';
import { NotFound } from '@/views/NotFound';
import { JwtService } from '@/core/services/JwtService';
import DashboardView from '@/views/DashboardView';
import AdminUsersView from '@/modules/users/views/AdminUsersView';
import AdminProjectsView from '@/modules/projects/views/AdminProjectsView';
import ProjectDetailView from '@/modules/projects/views/ProjectDetailView';


// Loader para rutas protegidas
const authLoader: LoaderFunction = async () => {
  const token = JwtService.getToken();
  if (!token) {
    return redirect('/login?redirect=' + encodeURIComponent(window.location.pathname));
  } else {
    
    return null;
  }
  
};

// Loader para rutas de invitados (evitar acceso a autenticados)
const guestLoader: LoaderFunction = async () => {
  const token = JwtService.getToken();
  if (token) return redirect('/admin');
  return null;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutAuth />,
    errorElement: <NotFound />,
    children: [
      { 
        path: '/login', 
        element: <LoginView />,
        loader: guestLoader
      },
      { 
        path: '/', 
        element: <LoginView />,
        loader: guestLoader
      }
    ]
  },
  {
    path: '/admin',
    element: <LayoutAdmin />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <DashboardView title="Home" />,
      },
      {
        path: '/admin/users',
        element: <AdminUsersView />,
      },
      {
        path: '/admin/projects',
        element: <AdminProjectsView />,
      },
      {
        path: '/admin/projects/:projectId',
        element: <ProjectDetailView />,
      }
    
    ]
  },
  { 
    path: '*', 
    element: <NotFound /> 
  }
]);