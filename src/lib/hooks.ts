import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function useImageLoad() {
    const [loading, setLoading] = useState(true);

    return { loading, setLoading };
}

function useGuestParams() {
    const [guest, setGuest] = useState<string | undefined>(undefined);
    const toGuest = useSearchParams().get('to');
    useEffect(() => {
        setGuest(toGuest ?? 'Invited Guest');
    }, [toGuest]);

    return guest;
}

export { useImageLoad, useGuestParams };
