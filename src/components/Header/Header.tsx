'use client';

import {JSX} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/components/Button';


interface NavigationItem {
    name: string;
    href: string;
}

const Header: () => JSX.Element = () => {
    const pathname = usePathname();

    const navigation: NavigationItem[] = [
        { name: 'Map', href: '/map' },
        { name: 'Upload', href: '/upload' },
        { name: 'Reports', href: '/reports' },
        { name: 'Search', href: '/search' }
    ];

    return (
        <header className="bg-sky-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/public" className="flex items-center">
                            <img
                                src="/images/logo.png"
                                alt="Perspectrix Logo"
                                className="h-10 w-auto"
                            />
                            <span className="ml-3 text-xl font-semibold text-gray-700">
                Perspectrix
              </span>
                        </Link>
                    </div>

                    <nav className="flex space-x-4">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={pathname === item.href ? 'primary' : 'secondary'}
                                >
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;