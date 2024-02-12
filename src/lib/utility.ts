import type { CommentType } from "./stores";

// utilities
export const dateToString = (date: Date) => {
    const y: number = date.getFullYear();
    const m: string = ("0" + String(date.getMonth() + 1)).slice(-2);
    const d: string = ("0" + String(date.getDate())).slice(-2);

    return `${y}-${m}-${d}`
};

export const typeToJapanese = (type: CommentType) => {
    switch (type) {
        case 'book_review':
            return '書評紹介';
        case 'paper_reading':
            return '文献/論文講読';
        case 'research_presentation':
            return '研究発表';
    }
};

//何でMongoDBはDate型をstringで返却してくるんだ!!
//苦肉の策でDBのdateスキーマを最初からstringにしておく