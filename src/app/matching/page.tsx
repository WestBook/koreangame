"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, RotateCcw } from "lucide-react";
import { getShuffledVocabulary } from "@/data/vocabulary";

type CardData = {
    id: string; // unique card id
    vocabId: string;
    text: string;
    type: 'korean' | 'chinese';
    isMatched: boolean;
};

export default function MatchingPage() {
    const [cards, setCards] = useState<CardData[]>([]);
    const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
    const [isWon, setIsWon] = useState(false);
    const [moves, setMoves] = useState(0);

    const initGame = () => {
        // Pick 6 random words
        const picked = getShuffledVocabulary().slice(0, 6);

        // Create 12 cards (6 Korean, 6 Chinese)
        const newCards: CardData[] = [];
        picked.forEach((word) => {
            newCards.push({
                id: `${word.id}-kr`,
                vocabId: word.id,
                text: word.korean,
                type: 'korean',
                isMatched: false,
            });
            newCards.push({
                id: `${word.id}-zh`,
                vocabId: word.id,
                text: word.chinese,
                type: 'chinese',
                isMatched: false,
            });
        });

        // Shuffle cards
        setCards(newCards.sort(() => Math.random() - 0.5));
        setSelectedCards([]);
        setIsWon(false);
        setMoves(0);
    };

    useEffect(() => {
        initGame();
    }, []);

    const handleCardClick = (card: CardData) => {
        // Prevent clicking already matched cards or already selected cards
        if (card.isMatched || selectedCards.some(c => c.id === card.id)) return;

        // Prevent selecting more than 2 at a time
        if (selectedCards.length >= 2) return;

        const newSelected = [...selectedCards, card];
        setSelectedCards(newSelected);

        // If we've selected two cards, check for match
        if (newSelected.length === 2) {
            setMoves(prev => prev + 1);
            const isMatch = newSelected[0].vocabId === newSelected[1].vocabId && newSelected[0].type !== newSelected[1].type;

            if (isMatch) {
                // Match found!
                setCards(prev => prev.map(c =>
                    c.vocabId === newSelected[0].vocabId ? { ...c, isMatched: true } : c
                ));
                setSelectedCards([]);

                // Check win condition
                setTimeout(() => {
                    setCards(current => {
                        if (current.every(c => c.isMatched)) {
                            setIsWon(true);
                        }
                        return current;
                    });
                }, 500);
            } else {
                // No match, clear selection after delay
                setTimeout(() => {
                    setSelectedCards([]);
                }, 800);
            }
        }
    };

    if (cards.length === 0) return null;

    if (isWon) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-md w-full shadow-2xl"
                >
                    <Trophy size={64} className="mx-auto text-pink-500 mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
                    <h2 className="text-3xl font-bold text-white mb-2">通關成功！</h2>
                    <p className="text-slate-400 mb-8">總共花費步數</p>
                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-10">
                        {moves} <span className="text-2xl text-slate-500 font-medium">步</span>
                    </div>
                    <button
                        onClick={initGame}
                        className="w-full py-4 rounded-xl bg-pink-600 hover:bg-pink-500 font-bold text-white flex items-center justify-center gap-2 transition-colors shadow-lg shadow-pink-600/30"
                    >
                        <RotateCcw size={20} /> 再玩一次
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-[80vh] py-8 w-full max-w-5xl mx-auto">
            <div className="w-full mb-10 flex justify-between items-center text-slate-400 px-4">
                <div className="flex items-center gap-4">
                    <span className="font-medium bg-white/5 py-1 px-4 rounded-full border border-white/10 text-sm">
                        配對遊戲
                    </span>
                    <span className="text-sm font-medium tracking-wide">找出對應的中韓單字</span>
                </div>
                <span className="font-bold text-pink-400 bg-pink-500/10 py-1 px-4 rounded-full border border-pink-500/20">
                    消耗步數: {moves}
                </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 w-full px-4">
                {cards.map((card, index) => {
                    const isSelected = selectedCards.some(c => c.id === card.id);
                    const isMatched = card.isMatched;

                    return (
                        <motion.button
                            key={card.id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: isMatched ? 0 : 1,
                                scale: isMatched ? 0.8 : 1
                            }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            whileHover={(!isSelected && !isMatched) ? { y: -5, scale: 1.02 } : {}}
                            whileTap={(!isSelected && !isMatched) ? { scale: 0.95 } : {}}
                            onClick={() => handleCardClick(card)}
                            disabled={isMatched || selectedCards.length >= 2}
                            className={`
                aspect-[4/3] rounded-2xl p-2 sm:p-4 text-center flex items-center justify-center
                transition-all duration-300 shadow-xl border-2
                ${isSelected
                                    ? 'bg-pink-500/20 border-pink-400 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] z-10 scale-105'
                                    : 'bg-slate-800/90 backdrop-blur-sm border-white/5 hover:border-white/20 hover:bg-slate-700 hover:shadow-2xl text-slate-200'}
                ${isMatched ? 'pointer-events-none' : ''}
              `}
                        >
                            <span className={`${card.type === 'korean' ? 'font-bold text-2xl sm:text-4xl text-white' : 'font-medium text-xl sm:text-2xl text-slate-300'}`}>
                                {card.text}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
