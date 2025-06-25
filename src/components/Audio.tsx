'use client';
import { FaVolumeMute } from 'react-icons/fa';

export default function Audio() {
    return (
        <>
            <audio id='song' preload='none'>
                <source src='/audio/audio.mp3' type='audio/mp3' />
            </audio>
            <button
                onClick={() => {
                    const song = document.getElementById('song') as HTMLAudioElement;
                    if (song) {
                        song.muted = !song.muted;
                    }
                }}
                className='fixed bottom-4 right-8 z-9999 p-2 rounded-full bg-white/1 backdrop-blur-md mix-blend-difference text-white'>
                <FaVolumeMute size={16} />
            </button>
        </>
    );
}
