import {FC, JSX} from 'react';
import Link from 'next/link';

interface QuickLink {
    name: string;
    href: string;
}

const Footer: () => JSX.Element = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks: QuickLink[] = [
        { name: 'Map', href: '/map' },
        { name: 'Upload', href: '/upload' },
        { name: 'Reports', href: '/reports' },
        { name: 'Search', href: '/search' }
    ];

    return (
        <footer className="bg-sky-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-gray-600">
                        <h3 className="text-lg font-semibold mb-2">Perspectrix</h3>
                        <p className="text-sm">
                            Empowering visualization through innovative solutions
                        </p>
                    </div>

                    <div className="text-gray-600">
                        <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-gray-800">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-gray-600">
                        <h3 className="text-lg font-semibold mb-2">Contact</h3>
                        <p className="text-sm">
                            Questions? Get in touch with us
                        </p>
                        <Link
                            href="/contact"
                            className="text-sm hover:text-gray-800 mt-2 inline-block"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-600">
                        © {currentYear} Perspectrix. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;