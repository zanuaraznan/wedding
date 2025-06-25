'use client';
import gsap from 'gsap';
import Link from 'next/link';
import { Suspense, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useMountStore } from '@/app/store';
import { useImageLoad } from '@/lib/hooks';
import Guest from '../ui/Guest';

export default function Splash() {
    const { isMount, setMount } = useMountStore();
    const { loading, setLoading } = useImageLoad();
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.registerPlugin(SplitText, ScrollTrigger);
            const splitEls = gsap.utils.toArray<HTMLElement>('.split');
            splitEls.forEach((el) => {
                gsap.set(el, {
                    willChange: 'transform, opacity',
                    yPercent: 0,
                    opacity: 1,
                });

                const split = new SplitText(el, {
                    type: 'chars,lines',
                    mask: 'lines',
                });

                gsap.from(split.chars, {
                    duration: 0.6,
                    yPercent: 100,
                    stagger: 0.05,
                    opacity: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        toggleActions: 'restart none none none',
                    },
                });
            });
            const appearEls = gsap.utils.toArray<HTMLElement>('.appear');

            appearEls.forEach((el, index) => {
                gsap.set(el, {
                    willChange: 'transform,opacity',
                    yPercent: 0,
                    opacity: 1,
                });

                gsap.from(el, {
                    duration: 1,
                    ease: 'power2.out',
                    yPercent: 100,
                    opacity: 0,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: el,
                        toggleActions: 'restart none none none',
                    },
                });
            });
        },
        { scope: container }
    );

    return (
        !isMount && (
            <main
                ref={container}
                className='overflow-hidden splash inset-0 fixed z-999 bg-zinc-900 text-white flex items-center justify-end pb-20 gap-4 flex-col transition-transform transform duration-1000 ease-[cubic-bezier(.78,0,.31,.96)]'>
                <Image
                    src='/img/Andry-Meylani-4.jpg'
                    priority
                    width={1200}
                    height={800}
                    alt='Andry & Meylani'
                    onLoad={() => setLoading(false)}
                    className={cn(
                        'absolute inset-0 h-full w-full -z-1 object-cover object-top opacity-50 transition-all duration-1000 hover:object-top',
                        loading && 'opacity-0'
                    )}
                />
                <div className='relative'>
                    <span className='newsreader split absolute right-3 top-6 text-4xl'>
                        &
                    </span>
                    <h1 className='split !text-6xl'>
                        Andry
                        <br />
                        Melyani
                    </h1>
                </div>
                <Suspense>
                    <Guest
                        as='p'
                        className='starting:opacity-0 transition-opacity duration-1000 text-lg'
                    />
                </Suspense>

                <div className='appear relative z-1'>
                    <button
                        onClick={(e) => {
                            (document.getElementById('song') as HTMLAudioElement).play();
                            const parent = e.currentTarget.closest('.splash');
                            parent?.classList.add('-translate-y-full');
                            setTimeout(() => setMount(true), 1000);
                        }}
                        className='bg-white text-zinc-800 p-3 px-5 rounded-lg'>
                        Let's begin
                    </button>
                </div>
                <footer className='absolute bottom-4'>
                    <p className='text-xs font-medium opacity-80'>
                        Re-made by{' '}
                        <Link
                            href='https://github.com/zanuaraznan'
                            className='text-blue-200'>
                            Zanuarrasyidin
                        </Link>
                    </p>
                </footer>
            </main>
        )
    );
}
