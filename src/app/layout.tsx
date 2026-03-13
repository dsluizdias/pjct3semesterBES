import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Joga Fácil',
    description: 'Marketplace de Aluguel de Quadras Esportivas',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={inter.className}>
                <nav className="bg-verdeBandeira text-white p-4 shadow-md flex justify-between items-center">
                    <div className="text-2xl font-bold italic tracking-wider">Joga Fácil</div>
                    <div className="space-x-4">
                        <button className="hover:text-amareloOuro transition-colors">Entrar</button>
                        <button className="bg-amareloOuro text-verdeEscuro px-4 py-2 rounded-md font-bold hover:bg-amareloClaro transition-colors">
                            Cadastre sua Arena
                        </button>
                    </div>
                </nav>
                <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </body>
        </html>
    )
}
