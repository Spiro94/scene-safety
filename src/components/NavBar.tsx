import { Compass, LogOut, Search, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useAppSelector } from '../hooks/useAppSelector';
import { signOutAsync, type AuthState } from '../store/slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../hooks/useDispatch';

export default function NavBar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const toggleMenu = () => setMenuOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    let activeCn = ' text-accent-teal hover:text-accent-teal-light bg-accent-teal-muted ';
    let inactiveCn = ' text-secondary hover:text-muted ';

    const auth = useAppSelector(state => state.auth as AuthState);
    const userEmail = auth.user?.email ?? '';
    const userInitial = userEmail.charAt(0).toUpperCase() || '?';


    return (
        <nav className='flex gap-8 bg-card border border-border py-4 px-10 items-center'>
            <div className='flex-1 gap-8 flex items-center'>
                <div className='inline-flex gap-2 items-center'>
                    <ShieldCheck className='text-accent-teal'></ShieldCheck>
                    <h1 className='text-primary'>SafeWatch</h1>
                </div>
                <Link to='/app/search' className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 w-48 ${location.pathname === '/app/search' ? activeCn : inactiveCn}`}>
                    <Search size={20}></Search>
                    <p className='text-sm'>Search</p>
                </Link>
                <Link to='/app/trending' className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 w-48 ${location.pathname === '/app/trending' ? activeCn : inactiveCn}`}>
                    <Compass size={20}></Compass>
                    <p className='text-sm'>Browse</p>
                </Link>
            </div>
            <div className='relative' ref={menuRef}>

                <div onClick={toggleMenu} className='inline-flex gap-2 items-center cursor-pointer'>
                    <div className='h-8 w-8 rounded-full bg-accent-blue-muted text-accent-blue flex items-center justify-center text-sm font-semibold'>
                        {userInitial}
                    </div>
                    <div className='text-primary text-sm'>{userEmail}</div>
                </div>
                {menuOpen && (
                    <div className='absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-md z-50'>
                        <button
                            className='w-full inline-flex gap-2 items-center text-left px-4 py-2 text-sm text-accent-teal cursor-pointer'
                            onClick={() => {
                                dispatch(signOutAsync());
                            }}
                        >
                            <LogOut></LogOut> Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}
