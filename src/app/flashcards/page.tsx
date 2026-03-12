"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { vocabulary } from "@/data/vocabulary";

export default function FlashcardsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const words = vocabulary;
    const currentWord = words[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 150);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
        }, 150);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
            <div className="w-full max-w-md mb-8 flex justify-between items-center text-slate-400">
                <span className="font-medium bg-white/5 py-1 px-3 rounded-full border border-white/10">
                    學習進度
                </span>
                <span className="font-bold">
                    {currentIndex + 1} / {words.length}
                </span>
            </div>

            <div
                className="w-full max-w-md aspect-[4/3] sm:aspect-video md:aspect-[4/3] relative"
                style={{ perspective: "1000px" }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full cursor-pointer absolute inset-0"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.div
                            className="w-full h-full relative"
                            style={{ transformStyle: "preserve-3d" }}
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            {/* Front side (Korean) */}
                            <div
                                className="absolute inset-0 w-full h-full bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden group hover:border-violet-500/50 transition-colors"
                                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-sm font-semibold text-violet-400 mb-6 tracking-wider uppercase">
                                    {currentWord.category}
                                </p>
                                <h2 className="text-5xl sm:text-7xl font-bold text-white mb-4">
                                    {currentWord.korean}
                                </h2>
                                <p className="text-slate-500 mt-8 text-sm flex items-center gap-2">
                                    <RotateCcw size={14} /> 點擊翻轉查看意思
                                </p>
                            </div>

                            {/* Back side (Chinese & Romaja) */}
                            <div
                                className="absolute inset-0 w-full h-full bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden group hover:border-cyan-500/50 transition-colors"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)"
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-6 tracking-wider">
                                    {currentWord.chinese}
                                </h3>
                                <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-xl text-slate-300 font-mono tracking-wide">
                                        {currentWord.romaja}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-6 mt-16 z-10">
                <button
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-slate-800/80 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 text-slate-300 hover:text-white"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-violet-600 hover:bg-violet-500 border border-violet-400/30 transition-all active:scale-95 text-white shadow-lg shadow-violet-500/25"
                >
                    <ChevronRight size={28} />
                </button>
            </div>
        </div>
    );
}
