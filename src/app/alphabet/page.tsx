"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { hangulData, HangulChar } from "@/data/hangul";

export default function AlphabetPage() {
    const [activeChar, setActiveChar] = useState<HangulChar | null>(null);

    const playAudio = (char: string) => {
        const utterance = new SpeechSynthesisUtterance(char);
        utterance.lang = "ko-KR";
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    const handleClick = (h: HangulChar) => {
        setActiveChar(h);
        playAudio(h.char);
    };

    const sections = [
        { title: "基本母音 (Basic Vowels)", type: "basic_vowel" },
        { title: "基本子音 (Basic Consonants)", type: "basic_consonant" },
        { title: "複合母音 (Complex Vowels)", type: "complex_vowel" },
        { title: "雙子音 (Double Consonants)", type: "double_consonant" },
    ];

    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] py-8 w-full max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                    韓文 40 音表
                </h1>
                <p className="text-slate-400">點擊字母即可聆聽精確發音</p>
            </div>

            <div className="w-full space-y-12">
                {sections.map(section => (
                    <div key={section.type}>
                        <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-violet-500 rounded-full" />
                            {section.title}
                        </h2>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
                            {hangulData
                                .filter(h => h.type === section.type)
                                .map(h => {
                                    return (
                                        <motion.button
                                            key={h.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleClick(h)}
                                            className="aspect-square rounded-2xl flex flex-col items-center justify-center transition-all bg-slate-800/80 border-white/5 border hover:border-violet-500/50 hover:bg-slate-700 text-slate-300 shadow-md"
                                        >
                                            <span className="text-3xl font-bold mb-1 pt-2">{h.char}</span>
                                            <span className="text-[10px] sm:text-xs text-slate-500 font-mono pb-2">
                                                {h.romaja}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {activeChar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setActiveChar(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            dragMomentum={false}
                            onDragEnd={(e, info) => {
                                if (info.offset.y > 100 || info.offset.y < -100) {
                                    setActiveChar(null);
                                }
                            }}
                            className="w-full max-w-sm bg-slate-800/95 border border-white/20 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center relative shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                            style={{ touchAction: "none" }}
                        >
                            <button
                                onClick={() => setActiveChar(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Drag Indicator */}
                            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-6 cursor-grab active:cursor-grabbing hover:bg-white/40 transition-colors" />

                            <p className="text-xs font-semibold text-violet-400 mb-2 tracking-widest uppercase">
                                {sections.find(s => s.type === activeChar.type)?.title}
                            </p>

                            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-6 drop-shadow-md">
                                {activeChar.char}
                            </div>

                            <div className="w-full bg-slate-900/50 rounded-2xl p-6 mb-8 border border-white/5">
                                <p className="text-sm text-slate-400 mb-1">羅馬拼音</p>
                                <p className="text-3xl font-mono font-bold text-white tracking-widest">{activeChar.romaja}</p>

                                {activeChar.name && (
                                    <div className="mt-5 pt-5 border-t border-white/10">
                                        <p className="text-center text-xs text-slate-400 mb-1 uppercase tracking-widest">字母名稱</p>
                                        <p className="text-lg font-medium text-slate-200">{activeChar.name}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => playAudio(activeChar.char)}
                                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-95 transition-all text-white font-medium shadow-lg shadow-violet-600/25"
                            >
                                <Volume2 size={20} /> 再次聆聽發音
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
