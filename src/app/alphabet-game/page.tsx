"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCcw, Trophy, CheckCircle2, XCircle } from "lucide-react";
import { getShuffledHangul, HangulChar } from "@/data/hangul";

export default function AlphabetGamePage() {
    const [questions, setQuestions] = useState<HangulChar[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState<HangulChar[]>([]);
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameMode, setGameMode] = useState<'romaja' | 'audio'>('romaja');

    const initGame = (mode: 'romaja' | 'audio' = 'romaja') => {
        const shuffled = getShuffledHangul().slice(0, 10);
        setQuestions(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setIsGameOver(false);
        setSelectedOpt(null);
        setGameMode(mode);
        generateOptions(shuffled[0]);
    };

    useEffect(() => {
        initGame('romaja');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateOptions = (correctChar: HangulChar) => {
        const allHangul = getShuffledHangul();
        const wrongOptions = allHangul
            .filter((h) => h.id !== correctChar.id && h.type === correctChar.type) // Match same type (e.g. all vowels) to make it tricky
            .slice(0, 3);

        // Fallback if not enough of same type
        if (wrongOptions.length < 3) {
            const extra = allHangul.filter(h => h.id !== correctChar.id && !wrongOptions.find(w => w.id === h.id)).slice(0, 3 - wrongOptions.length);
            wrongOptions.push(...extra);
        }

        const newOptions = [...wrongOptions, correctChar].sort(() => Math.random() - 0.5);
        setOptions(newOptions);
    };

    const playAudio = (char: string) => {
        const utterance = new SpeechSynthesisUtterance(char);
        utterance.lang = "ko-KR";
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    };

    const handleSelect = (optId: string) => {
        if (selectedOpt) return;

        setSelectedOpt(optId);
        const isCorrect = optId === questions[currentIndex].id;

        if (isCorrect) {
            setScore((prev) => prev + 10);
            playAudio(questions[currentIndex].char);
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setSelectedOpt(null);
                generateOptions(questions[nextIndex]);

                // Auto play audio for next question if in audio mode
                if (gameMode === 'audio') {
                    setTimeout(() => playAudio(questions[nextIndex].char), 300);
                }
            } else {
                setIsGameOver(true);
            }
        }, 1500);
    };

    if (questions.length === 0) return null;

    if (isGameOver) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] py-8 w-full px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-md w-full shadow-2xl"
                >
                    <Trophy size={64} className="mx-auto text-yellow-500 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                    <h2 className="text-3xl font-bold text-white mb-2">測驗完成！</h2>
                    <p className="text-slate-400 mb-8">40 音基礎訓練得分</p>
                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-10">
                        {score}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => initGame('romaja')}
                            className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold text-white transition-colors"
                        >
                            再玩一次 (羅馬拼音)
                        </button>
                        <button
                            onClick={() => initGame('audio')}
                            className="flex-1 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-white transition-colors"
                        >
                            再玩一次 (聽力挑戰)
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] py-8 w-full max-w-2xl mx-auto px-4">
            {/* Header */}
            <div className="w-full mb-8 flex justify-between items-center text-slate-400">
                <span className="font-medium bg-white/5 py-1 px-4 rounded-full border border-white/10">
                    第 {currentIndex + 1} / 10 題
                </span>
                <div className="flex gap-2">
                    <button
                        onClick={() => initGame(gameMode === 'romaja' ? 'audio' : 'romaja')}
                        className="text-xs border border-white/10 rounded-full px-3 py-1 hover:bg-white/5 transition-colors"
                    >
                        {gameMode === 'romaja' ? '切換聽力模式' : '切換拼音模式'}
                    </button>
                    <span className="font-bold text-violet-400 bg-violet-500/10 py-1 px-4 rounded-full border border-violet-500/20">
                        分數: {score}
                    </span>
                </div>
            </div>

            {/* Question Card */}
            <div className="w-full bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/5 p-12 text-center mb-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                <p className="text-slate-400 mb-6 text-sm font-medium tracking-widest uppercase relative z-10 flex items-center justify-center gap-2">
                    {gameMode === 'romaja' ? '找出對應的韓文字母' : '聽發音，選出對應的字母'}
                </p>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQ.id + gameMode}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        {gameMode === 'romaja' ? (
                            <h2 className="text-7xl sm:text-8xl font-mono font-bold text-white tracking-widest">
                                {currentQ.romaja}
                            </h2>
                        ) : (
                            <button
                                onClick={() => playAudio(currentQ.char)}
                                className="p-8 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors animate-pulse hover:animate-none"
                            >
                                <Volume2 size={64} />
                            </button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
                {options.map((opt, index) => {
                    let stateStyle = "bg-slate-800/80 border-white/10 hover:border-violet-400 hover:bg-slate-700 shadow-lg";
                    let icon = null;

                    if (selectedOpt) {
                        const isCorrectOption = opt.id === currentQ.id;
                        const isSelectedOption = opt.id === selectedOpt;

                        if (isCorrectOption) {
                            stateStyle = "bg-green-500/20 border-green-500/50 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.2)]";
                            icon = <CheckCircle2 size={24} className="text-green-400" />;
                        } else if (isSelectedOption && !isCorrectOption) {
                            stateStyle = "bg-red-500/20 border-red-500/50 text-red-300";
                            icon = <XCircle size={24} className="text-red-400" />;
                        } else {
                            stateStyle = "bg-slate-800/30 border-white/5 opacity-40";
                        }
                    }

                    return (
                        <motion.button
                            key={opt.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={selectedOpt ? {} : { scale: 1.02 }}
                            whileTap={selectedOpt ? {} : { scale: 0.98 }}
                            onClick={() => handleSelect(opt.id)}
                            disabled={!!selectedOpt}
                            className={`relative p-8 rounded-2xl border transition-all flex items-center justify-center gap-3 ${stateStyle}`}
                        >
                            <span className="text-5xl font-bold">{opt.char}</span>
                            {icon && <span className="absolute top-4 right-4">{icon}</span>}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
