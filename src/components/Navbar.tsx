"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="p-2 rounded-xl"
                    >
                        <BookOpen size={24} className="text-violet-500" />
                    </motion.div>
                    <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-violet-500 to-sky-400 bg-clip-text text-transparent">
                        K-Vocab Game
                    </span>
                </Link>

                {pathname !== "/" && (
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <Home size={18} />
                            <span className="text-sm font-medium">回首頁</span>
                        </motion.button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
