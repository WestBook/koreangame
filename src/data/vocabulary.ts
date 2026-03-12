import { Vocabulary } from '../types/game';

export const vocabulary: Vocabulary[] = [
    // Greetings & Basics
    { id: 'v1', korean: '안녕하세요', romaja: 'annyeonghaseyo', chinese: '你好', category: 'Greetings' },
    { id: 'v2', korean: '감사합니다', romaja: 'gamsahamnida', chinese: '謝謝', category: 'Greetings' },
    { id: 'v3', korean: '네', romaja: 'ne', chinese: '是', category: 'Basics' },
    { id: 'v4', korean: '아니요', romaja: 'aniyo', chinese: '不是', category: 'Basics' },
    { id: 'v5', korean: '죄송합니다', romaja: 'joesonghamnida', chinese: '對不起', category: 'Greetings' },
    { id: 'v6', korean: '안녕히 계세요', romaja: 'annyeonghi gyeseyo', chinese: '再見 (對留下的人)', category: 'Greetings' },
    { id: 'v7', korean: '안녕히 가세요', romaja: 'annyeonghi gaseyo', chinese: '再見 (對離開的人)', category: 'Greetings' },

    // Numbers (Sino-Korean basics)
    { id: 'n1', korean: '일', romaja: 'il', chinese: '一 (整數)', category: 'Numbers' },
    { id: 'n2', korean: '이', romaja: 'i', chinese: '二 (整數)', category: 'Numbers' },
    { id: 'n3', korean: '삼', romaja: 'sam', chinese: '三 (整數)', category: 'Numbers' },
    { id: 'n4', korean: '사', romaja: 'sa', chinese: '四 (整數)', category: 'Numbers' },
    { id: 'n5', korean: '오', romaja: 'o', chinese: '五 (整數)', category: 'Numbers' },
    { id: 'n6', korean: '육', romaja: 'yuk', chinese: '六 (整數)', category: 'Numbers' },
    { id: 'n7', korean: '칠', romaja: 'chil', chinese: '七 (整數)', category: 'Numbers' },
    { id: 'n8', korean: '팔', romaja: 'pal', chinese: '八 (整數)', category: 'Numbers' },
    { id: 'n9', korean: '구', romaja: 'gu', chinese: '九 (整數)', category: 'Numbers' },
    { id: 'n10', korean: '십', romaja: 'sip', chinese: '十 (整數)', category: 'Numbers' },

    // Food
    { id: 'f1', korean: '물', romaja: 'mul', chinese: '水', category: 'Food' },
    { id: 'f2', korean: '밥', romaja: 'bap', chinese: '飯', category: 'Food' },
    { id: 'f3', korean: '김치', romaja: 'gimchi', chinese: '泡菜', category: 'Food' },
    { id: 'f4', korean: '고기', romaja: 'gogi', chinese: '肉', category: 'Food' },
    { id: 'f5', korean: '우유', romaja: 'uyu', chinese: '牛奶', category: 'Food' },
    { id: 'f6', korean: '커피', romaja: 'keopi', chinese: '咖啡', category: 'Food' },
    { id: 'f7', korean: '빵', romaja: 'ppang', chinese: '麵包', category: 'Food' },
    { id: 'f8', korean: '과일', romaja: 'gwail', chinese: '水果', category: 'Food' },

    // Nouns / Objects
    { id: 'o1', korean: '책', romaja: 'chaek', chinese: '書', category: 'Objects' },
    { id: 'o2', korean: '가방', romaja: 'gabang', chinese: '包包', category: 'Objects' },
    { id: 'o3', korean: '학교', romaja: 'hakgyo', chinese: '學校', category: 'Places' },
    { id: 'o4', korean: '집', romaja: 'jip', chinese: '家', category: 'Places' },
    { id: 'o5', korean: '사람', romaja: 'saram', chinese: '人', category: 'Basics' }
];

export const getVocabularyByCategory = (category: string) => {
    return vocabulary.filter(v => v.category === category);
};

// 取得打亂順序的單字陣列
export const getShuffledVocabulary = () => {
    return [...vocabulary].sort(() => Math.random() - 0.5);
};
