export interface Vocabulary {
    id: string;
    korean: string;
    romaja: string; // Romanization to help with pronunciation
    chinese: string;
    category: string;
}

export type GameMode = 'flashcards' | 'quiz' | 'matching';
