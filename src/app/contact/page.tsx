'use client'

import { useEffect } from 'react'

export default function Page() {
    useEffect(() => {
        window.location.href = 'https://github.com/will-s-stone'
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Redirecting to GitHub...</p>
        </div>
    )
}