"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, Dices, CopyPlus, BookA, Headphones } from "lucide-react";

export default function Home() {
  const phase0Modes = [
    {
      id: "alphabet",
      title: "動態 40 音表",
      description: "點擊發音，零基礎從這裡開始",
      icon: <BookA size={32} />,
      color: "from-emerald-500 to-teal-400",
      href: "/alphabet",
    },
    {
      id: "alphabet-game",
      title: "40 音測驗",
      description: "訓練拼音與聽力，快速記住字母",
      icon: <Headphones size={32} />,
      color: "from-cyan-500 to-blue-400",
      href: "/alphabet-game",
    },
  ];

  const phase1Modes = [
    {
      id: "flashcards",
      title: "字卡模式",
      description: "翻轉卡片，輕鬆記憶韓文單字與發音",
      icon: <Layers size={32} />,
      color: "from-blue-500 to-indigo-400",
      href: "/flashcards",
    },
    {
      id: "quiz",
      title: "選擇題測驗",
      description: "挑戰你的記憶力，看看能答對幾題",
      icon: <CopyPlus size={32} />,
      color: "from-violet-500 to-purple-400",
      href: "/quiz",
    },
    {
      id: "matching",
      title: "配對遊戲",
      description: "韓文與中文連連看，考驗反應速度",
      icon: <Dices size={32} />,
      color: "from-pink-500 to-rose-400",
      href: "/matching",
    },
  ];

  const renderModes = (modes: typeof phase0Modes) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
      {modes.map((mode, index) => (
        <Link href={mode.href} key={mode.id} className="block group">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-full block p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/0 hover:from-white/20 hover:to-white/5 transition-all duration-300"
          >
            <div className="h-full bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center text-center border border-white/5 relative overflow-hidden">
              <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${mode.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />

              <div className={`p-4 rounded-full bg-gradient-to-br ${mode.color} text-white mb-6 shadow-xl`}>
                {mode.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3 text-slate-100">{mode.title}</h2>
              <p className="text-slate-400 leading-relaxed text-sm">{mode.description}</p>

              <div className="mt-8 px-6 py-2 rounded-full border border-white/10 text-sm font-medium text-slate-300 group-hover:border-white/20 group-hover:bg-white/5 transition-all">
                開始學習 &rarr;
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-violet-400 text-sm font-semibold mb-4 border border-white/10 tracking-wider">
          V 0.1.1 零基礎更新
        </span>
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white">
          輕鬆學韓文
          <span className="block mt-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            開始你的破關之旅
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          由淺入深，從最基礎的發音開始，到單字測驗，每天進步一點點。
        </p>
      </motion.div>

      <div className="w-full max-w-5xl flex flex-col items-center">
        <div className="w-full mb-4">
          <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-emerald-500 rounded-full" />
            階段零：新手村
          </h2>
        </div>
        {renderModes(phase0Modes)}

        <div className="w-full mb-4 mt-8">
          <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-violet-500 rounded-full" />
            階段一：基礎單字
          </h2>
        </div>
        {renderModes(phase1Modes)}
      </div>
    </div>
  );
}
