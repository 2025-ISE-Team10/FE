import React from 'react';
import { ShoppingBag, Users } from 'lucide-react';

const PrettyNavButton = ({ view, currentView, onClick, children }) => {
  const isActive = view === currentView;

  const getIcon = () => {
    if (view === "market") {
      return <ShoppingBag className="w-5 h-5" />;
    }
    return <Users className="w-5 h-5" />;
  };

  const getGradient = () => {
    if (view === "market") {
      return isActive 
        ? "bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 shadow-emerald-300/50" 
        : "bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-400 hover:from-emerald-400 hover:via-emerald-500 hover:to-green-500";
    }
    return isActive 
      ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 shadow-indigo-300/50" 
      : "bg-gradient-to-r from-indigo-300 via-indigo-400 to-purple-400 hover:from-indigo-400 hover:via-indigo-500 hover:to-purple-500";
  };

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        relative group overflow-hidden
        px-6 py-3 rounded-2xl font-semibold text-sm
        ${getGradient()}
        text-white shadow-lg transition-all duration-300
        hover:scale-110 hover:shadow-xl active:scale-95
        ${isActive ? 'shadow-2xl ring-4 ring-white/20' : 'hover:shadow-2xl'}
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0 
        before:transition-opacity before:duration-300 hover:before:opacity-100
        after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:to-transparent
      `}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
          {getIcon()}
        </span>
        <span className="tracking-wide">{children}</span>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/80 rounded-full animate-pulse" />
      )}
    </button>
  );
};

export default PrettyNavButton;
