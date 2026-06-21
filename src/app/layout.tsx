import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Daksh Saini',
    description: 'Frontend engineer. UI/UX designer. Astrophysics pipeline author.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}