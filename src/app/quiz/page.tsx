"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import { getShuffledVocabulary, vocabulary } from "@/data/vocabulary";
import type { Vocabulary } from "@/types/game";

export default function QuizPage() {
    const [questions, setQuestions] = useState<Vocabulary[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState<Vocabulary[]>([]);
    const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    const initQuiz = () => {
        const shuffled = getShuffledVocabulary().slice(0, 10);
        setQuestions(shuffled);
        setCurrentIndex(0);
        setScore(0);
        setIsGameOver(false);
        setSelectedOpt(null);
        generateOptions(shuffled[0]);
    };

    useEffect(() => {
        initQuiz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateOptions = (correctWord: Vocabulary) => {
        const wrongOptions = vocabulary
            .filter((v) => v.id !== correctWord.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const allOptions = [...wrongOptions, correctWord].sort(() => Math.random() - 0.5);
        setOptions(allOptions);
    };

    const handleSelect = (optId: string) => {
        if (selectedOpt) return; // Prevent multiple clicks

        setSelectedOpt(optId);

        const isCorrect = optId === questions[currentIndex].id;
        if (isCorrect) {
            setScore((prev) => prev + 10);
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex);
                setSelectedOpt(null);
                generateOptions(questions[nextIndex]);
            } else {
                setIsGameOver(true);
            }
        }, 1500); // Wait 1.5s to show result
    };

    if (questions.length === 0) return null;

    if (isGameOver) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-md w-full shadow-2xl"
                >
                    <Trophy size={64} className="mx-auto text-yellow-500 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                    <h2 className="text-3xl font-bold text-white mb-2">測驗完成！</h2>
                    <p className="text-slate-400 mb-8">你的最終得分是</p>
                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-10">
                        {score}
                    </div>
                    <button
                        onClick={initQuiz}
                        className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-violet-600/30"
                    >
                        <RotateCcw size={20} /> 再挑戰一次
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] py-8 w-full max-w-2xl mx-auto">
            <div className="w-full mb-8 flex justify-between items-center text-slate-400">
                <span className="font-medium bg-white/5 py-1 px-4 rounded-full border border-white/10">
                    第 {currentIndex + 1} / {questions.length} 題
                </span>
                <span className="font-bold text-violet-400 bg-violet-500/10 py-1 px-4 rounded-full border border-violet-500/20">
                    分數: {score}
                </span>
            </div>

            <div className="w-full bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/5 p-8 sm:p-16 text-center mb-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <p className="text-slate-400 mb-6 text-sm font-medium tracking-widest uppercase relative z-10">
                    請選擇正確的中文意思
                </p>
                <h2 className="text-6xl sm:text-7xl font-bold text-white relative z-10">
                    {currentQ.korean}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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
                            className={`relative p-6 sm:p-8 rounded-2xl border text-xl font-medium transition-all text-slate-200 flex items-center justify-center gap-3 ${stateStyle}`}
                        >
                            {opt.chinese}
                            {icon && <span className="absolute right-6">{icon}</span>}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
