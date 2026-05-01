import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { LogOut, BrainCircuit, Coins, ShoppingCart, LayoutDashboard, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLink = (to, label, Icon) => {
        const isActive = location.pathname === to;
        return (
            <Link
                to={to}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-textMuted hover:text-white hover:bg-white/5'
                }`}
            >
                <Icon className="w-4 h-4" />
                {label}
            </Link>
        );
    };

    return (
        <nav className="fixed w-full z-50 top-0 bg-background/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2.5 group">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="p-1.5 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors"
                        >
                            <BrainCircuit className="w-6 h-6 text-primary" />
                        </motion.div>
                        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Prepvox
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                {/* Credit Badge */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                                        user.credits <= 0
                                            ? 'bg-red-500/20 border-red-500/40 text-red-300'
                                            : user.credits <= 2
                                            ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300'
                                            : 'bg-primary/20 border-primary/40 text-primary'
                                    }`}
                                >
                                    <Coins className="w-3.5 h-3.5" />
                                    {user.credits ?? 0} Credits
                                </motion.div>

                                <Link
                                    to="/pricing"
                                    className="hidden sm:flex items-center gap-1.5 text-sm text-textMuted hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
                                >
                                    <ShoppingCart className="w-4 h-4" /> Buy
                                </Link>

                                {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
                                {navLink('/profile', 'Profile', UserIcon)}

                                {/* User Info + Logout */}
                                <div className="flex items-center gap-2 pl-2 border-l border-white/10 ml-1">
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold flex-shrink-0">
                                        {user.name?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-500/10"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm text-textMuted hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
                                    Sign In
                                </Link>
                                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                                    Get Started Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
