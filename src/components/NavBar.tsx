import { Compass, Search, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export default function NavBar() {
    const location = useLocation();
    console.log(`Location ${location.pathname}`);

    let activeCn = ' text-accent-teal hover:text-accent-teal-light bg-accent-teal-muted ';
    let inactiveCn = ' text-secondary hover:text-muted ';


    return (
        <nav className='flex gap-8 bg-card border border-border py-4 px-10'>
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
        </nav>
    )
}
