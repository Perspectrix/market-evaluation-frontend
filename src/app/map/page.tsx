'use client';

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(
    () => import('@/components/Map'),
    { ssr: false }
);

export default function MapPage() {
    return (
        <div className="h-screen w-full">
            <DynamicMap />
        </div>
    );
}