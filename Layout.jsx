import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import {
  LayoutDashboard,
  Car,
  Users,
  Route,
  Fuel,
  Calculator,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: 'Dashboard', icon: LayoutDashboard },
  { name: 'Pojazdy', href: 'Vehicles', icon: Car },
  { name: 'Kierowcy', href: 'Drivers', icon: Users },
  { name: 'Przejazdy', href: 'Trips', icon: Route },
  { name: 'Tankowania', href: 'Refueling', icon: Fuel },
  { name: 'Kalkulator', href: 'Calculator', icon: Calculator },
  { name: 'Ustawienia', href: 'Settings', icon: Settings },
];

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const isAuth = await base44.auth.isAuthenticated();
    if (isAuth) {
      const userData = await base44.auth.me();
      setUser(userData);
    }
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-body-bg)' }}>
      <style>{`
        :root {
          --theme-primary: #1e3a8a;
          --theme-primary-dark: #1e40af;
          --theme-primary-hover: #2563eb;
          --theme-primary-light: #eff6ff;
          --theme-secondary: #0ea5e9;
          --theme-accent: #3b82f6;
          --theme-success: #10b981;
          --theme-warning: #f59e0b;
          --theme-gradient: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          --theme-card-gradient: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%);
          --theme-sidebar-gradient: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          --theme-body-bg: #f8fafc;
          --theme-text-primary: #0f172a;
          --theme-text-secondary: #475569;
          --theme-card-bg: rgba(255, 255, 255, 0.95);
          --theme-border-color: rgba(226, 232, 240, 0.5);
          --theme-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          --theme-shadow-hover: 0 20px 40px rgba(30, 58, 138, 0.15);
        }
        
        .glass-card {
          background: var(--theme-card-gradient);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: var(--theme-shadow);
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--theme-shadow-hover);
          border-color: rgba(59, 130, 246, 0.3);
        }
        
        .btn-modern {
          background: var(--theme-gradient);
          color: white;
          font-weight: 600;
          padding: 12px 24px;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(30, 58, 138, 0.3);
        }
        
        .gradient-text {
          background: var(--theme-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        
        .status-badge:before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        
        .status-available {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
        }
        
        .status-available:before {
          background: #16a34a;
        }
        
        .status-in-use {
          background: rgba(249, 115, 22, 0.1);
          color: #ea580c;
        }
        
        .status-in-use:before {
          background: #ea580c;
        }
        
        .modern-input {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--theme-border-color);
          border-radius: 12px;
          padding: 12px 16px;
          transition: all 0.3s;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
        }
        
        .modern-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          outline: none;
        }
        
        .progress-bar {
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .karta-font {
          font-family: 'Roboto Mono', monospace;
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 ease-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: 'var(--theme-sidebar-gradient)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'var(--theme-gradient)' }}>
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Long Drive</h1>
              <p className="text-xs text-slate-400">Zarządzanie Flotą</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = currentPageName === item.href;
            return (
              <Link
                key={item.name}
                to={createPageUrl(item.href)}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                style={isActive ? { background: 'var(--theme-gradient)' } : {}}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-semibold">
                {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.full_name || 'Użytkownik'}
                </p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:bg-slate-100 p-2 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold text-slate-800 hidden sm:block">
                {navigation.find(n => n.href === currentPageName)?.name || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              System aktywny
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}