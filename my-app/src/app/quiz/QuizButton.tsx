'use client';

import { useState } from 'react';

export default function ShowQuiz({
    choice,
    is_correct
}: {
    choice: string;
    is_correct: boolean;
}) {
    // 結果の状態を管理
    const [result, setResult] = useState<string | null>(null);

    // ボタンをクリックした時の処理
    const handleClick = () => {
        setResult(is_correct ? '○' : '×');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* choice ボタン */}
            <button
                onClick={handleClick}
                style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer'
                }}
            >
                {choice}
            </button>
            {/* 結果表示 */}
            {result && <span>{result}</span>}
        </div>
    );
}
