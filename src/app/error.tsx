'use client';

import { useEffect } from "react";

export default function ErrorFallback({error, reset}: {error: Error; reset: () => void;}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div>
        <h3>오류가 발생했습니다.</h3>
        <button type="button" onClick={() => reset()}>다시 시도하기</button>
        </div>
    );
}