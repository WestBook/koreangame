export type HangulChar = {
    id: string;
    char: string;
    romaja: string;
    type: 'basic_consonant' | 'double_consonant' | 'basic_vowel' | 'complex_vowel';
    name?: string; // e.g., giyeok
};

export const hangulData: HangulChar[] = [
    // --- 14 Basic Consonants (基本子音) ---
    { id: 'c1', char: 'ㄱ', romaja: 'g/k', type: 'basic_consonant', name: '기역 (giyeok)' },
    { id: 'c2', char: 'ㄴ', romaja: 'n', type: 'basic_consonant', name: '니은 (nieun)' },
    { id: 'c3', char: 'ㄷ', romaja: 'd/t', type: 'basic_consonant', name: '디귿 (digeut)' },
    { id: 'c4', char: 'ㄹ', romaja: 'r/l', type: 'basic_consonant', name: '리을 (rieul)' },
    { id: 'c5', char: 'ㅁ', romaja: 'm', type: 'basic_consonant', name: '미음 (mieum)' },
    { id: 'c6', char: 'ㅂ', romaja: 'b/p', type: 'basic_consonant', name: '비읍 (bieup)' },
    { id: 'c7', char: 'ㅅ', romaja: 's', type: 'basic_consonant', name: '시옷 (siot)' },
    { id: 'c8', char: 'ㅇ', romaja: 'ng', type: 'basic_consonant', name: '이응 (ieung)' },
    { id: 'c9', char: 'ㅈ', romaja: 'j', type: 'basic_consonant', name: '지읒 (jieut)' },
    { id: 'c10', char: 'ㅊ', romaja: 'ch', type: 'basic_consonant', name: '치읓 (chieut)' },
    { id: 'c11', char: 'ㅋ', romaja: 'k', type: 'basic_consonant', name: '키읔 (kieuk)' },
    { id: 'c12', char: 'ㅌ', romaja: 't', type: 'basic_consonant', name: '티읕 (tieut)' },
    { id: 'c13', char: 'ㅍ', romaja: 'p', type: 'basic_consonant', name: '피읖 (pieup)' },
    { id: 'c14', char: 'ㅎ', romaja: 'h', type: 'basic_consonant', name: '히읗 (hieut)' },

    // --- 5 Double Consonants (雙子音) ---
    { id: 'dc1', char: 'ㄲ', romaja: 'kk', type: 'double_consonant', name: '쌍기역 (ssanggiyeok)' },
    { id: 'dc2', char: 'ㄸ', romaja: 'tt', type: 'double_consonant', name: '쌍디귿 (ssangdigeut)' },
    { id: 'dc3', char: 'ㅃ', romaja: 'pp', type: 'double_consonant', name: '쌍비읍 (ssangbieup)' },
    { id: 'dc4', char: 'ㅆ', romaja: 'ss', type: 'double_consonant', name: '쌍시옷 (ssangsiot)' },
    { id: 'dc5', char: 'ㅉ', romaja: 'jj', type: 'double_consonant', name: '쌍지읒 (ssangjieut)' },

    // --- 10 Basic Vowels (基本母音) ---
    { id: 'v1', char: 'ㅏ', romaja: 'a', type: 'basic_vowel', name: '아 (a)' },
    { id: 'v2', char: 'ㅑ', romaja: 'ya', type: 'basic_vowel', name: '야 (ya)' },
    { id: 'v3', char: 'ㅓ', romaja: 'eo', type: 'basic_vowel', name: '어 (eo)' },
    { id: 'v4', char: 'ㅕ', romaja: 'yeo', type: 'basic_vowel', name: '여 (yeo)' },
    { id: 'v5', char: 'ㅗ', romaja: 'o', type: 'basic_vowel', name: '오 (o)' },
    { id: 'v6', char: 'ㅛ', romaja: 'yo', type: 'basic_vowel', name: '요 (yo)' },
    { id: 'v7', char: 'ㅜ', romaja: 'u', type: 'basic_vowel', name: '우 (u)' },
    { id: 'v8', char: 'ㅠ', romaja: 'yu', type: 'basic_vowel', name: '유 (yu)' },
    { id: 'v9', char: 'ㅡ', romaja: 'eu', type: 'basic_vowel', name: '으 (eu)' },
    { id: 'v10', char: 'ㅣ', romaja: 'i', type: 'basic_vowel', name: '이 (i)' },

    // --- 11 Complex Vowels (複合母音) ---
    { id: 'cv1', char: 'ㅐ', romaja: 'ae', type: 'complex_vowel', name: '애 (ae)' },
    { id: 'cv2', char: 'ㅒ', romaja: 'yae', type: 'complex_vowel', name: '얘 (yae)' },
    { id: 'cv3', char: 'ㅔ', romaja: 'e', type: 'complex_vowel', name: '에 (e)' },
    { id: 'cv4', char: 'ㅖ', romaja: 'ye', type: 'complex_vowel', name: '예 (ye)' },
    { id: 'cv5', char: 'ㅘ', romaja: 'wa', type: 'complex_vowel', name: '와 (wa)' },
    { id: 'cv6', char: 'ㅙ', romaja: 'wae', type: 'complex_vowel', name: '왜 (wae)' },
    { id: 'cv7', char: 'ㅚ', romaja: 'oe', type: 'complex_vowel', name: '외 (oe)' },
    { id: 'cv8', char: 'ㅝ', romaja: 'wo', type: 'complex_vowel', name: '워 (wo)' },
    { id: 'cv9', char: 'ㅞ', romaja: 'we', type: 'complex_vowel', name: '웨 (we)' },
    { id: 'cv10', char: 'ㅟ', romaja: 'wi', type: 'complex_vowel', name: '위 (wi)' },
    { id: 'cv11', char: 'ㅢ', romaja: 'ui', type: 'complex_vowel', name: '의 (ui)' },
];

export const getHangulByType = (type: HangulChar['type']) => {
    return hangulData.filter(h => h.type === type);
};

export const getShuffledHangul = () => {
    return [...hangulData].sort(() => Math.random() - 0.5);
};
