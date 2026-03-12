"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { hangulData, HangulChar } from "@/data/hangul";

export default function AlphabetPage() {
    const [activeChar, setActiveChar] = useState<HangulChar | null>(null);

    const playAudio = (char: string) => {
        // Basic Web Speech API standard implementation
        const utterance = new SpeechSynthesisUtterance(char);
        utterance.lang = "ko-KR"; // Set language to Korean
        utterance.rate = 0.8; // Slightly slower for clear pronunciation
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
        <div className="flex flex-col items-center justify-start min-h-[80vh] py-8 w-full max-w-5xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
                    韓文 40 音表
                </h1>
                <p className="text-slate-400">點擊字母即可聆聽精確發音</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {/* Left/Middle Column: The Charts */}
                <div className="lg:col-span-2 space-y-12">
                    {sections.map(section => (
                        <div key={section.type}>
                            <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-violet-500 rounded-full" />
                                {section.title}
                            </h2>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
                                {hangulData
                                    .filter(h => h.type === section.type)
                                    .map(h => {
                                        const isActive = activeChar?.id === h.id;
                                        return (
                                            <motion.button
                                                key={h.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleClick(h)}
                                                className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all ${isActive
                                                        ? "bg-violet-600 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border-2 scale-110 z-10"
                                                        : "bg-slate-800/80 border-white/5 border hover:border-violet-500/50 hover:bg-slate-700 text-slate-300"
                                                    }`}
                                            >
                                                <span className="text-3xl font-bold mb-1">{h.char}</span>
                                                <span className={`text-xs ${isActive ? "text-violet-200" : "text-slate-500 font-mono"}`}>
                                                    {h.romaja}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Detail View (Sticky) */}
                <div className="relative">
                    <div className="sticky top-24">
                        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                            {activeChar ? (
                                <motion.div
                                    key={activeChar.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center w-full"
                                >
                                    <p className="text-sm font-semibold text-violet-400 mb-6 tracking-wider uppercase">
                                        {sections.find(s => s.type === activeChar.type)?.title}
                                    </p>
                                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-8 pb-2">
                                        {activeChar.char}
                                    </div>

                                    <div className="w-full bg-white/5 rounded-2xl p-6 mb-6">
                                        <p className="text-sm text-slate-400 mb-1">羅馬拼音</p>
                                        <p className="text-2xl font-mono text-white">{activeChar.romaja}</p>

                                        {activeChar.name && (
                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                <p className="text-center text-sm text-slate-400 mb-1">字母名稱</p>
                                                <p className="text-lg text-slate-200">{activeChar.name}</p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => playAudio(activeChar.char)}
                                        className="flexItems-center justify-center gap-2 w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 transition-colors text-white font-medium"
                                    >
                                        <Volume2 size={20} /> 再次聆聽發音
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="text-slate-500 flex flex-col items-center gap-4">
                                    <Volume2 size={48} className="opacity-20" />
                                    <p>點擊左側字母查看詳細資訊與發音</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
