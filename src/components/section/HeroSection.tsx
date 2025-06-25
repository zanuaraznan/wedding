import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useGuestParams } from '@/lib/hooks';
import { useImageStore, useMountStore } from '@/app/store';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

export default function HeroSection() {
    const { isMount } = useMountStore();
    const guest = useGuestParams();
    const { loading, setLoading } = useImageStore();
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
            const splitWords = gsap.utils.toArray<HTMLElement>('.word');
            splitWords.forEach((el) => {
                gsap.set(el, {
                    willChange: 'transform, opacity',
                    yPercent: 0,
                    opacity: 1,
                });

                const split = new SplitText(el, {
                    type: 'words,lines',
                    mask: 'lines',
                });

                gsap.from(split.words, {
                    duration: 1,
                    yPercent: 100,
                    stagger: 0.1,
                    opacity: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        toggleActions: 'restart none none none',
                    },
                });
            });
        },
        { dependencies: [isMount, guest], scope: container }
    );

    return (
        isMount && (
            <section ref={container} className='space-y-12'>
                <div className={cn('text-white relative flex justify-center')}>
                    <div className='w-full h-[600px]'>
                        <div
                            className={cn(
                                'relative w-full max-h-[600px] transition-[max-height] duration-1000 ease-in-out overflow-hidden flex justify-center',
                                loading && 'max-h-0'
                            )}>
                            <div className='absolute w-full -z-1'>
                                <Image
                                    priority
                                    src='/img/Andry-Meylani-6.jpg'
                                    width={800}
                                    height={1200}
                                    alt='Welcome'
                                    className='h-full w-full object-cover'
                                    onLoad={() => setLoading(false)}
                                />
                                <div className='absolute inset-0 h-full w-full bg-black/80 backdrop-blur-xs z-1'></div>
                            </div>
                            <Image
                                priority
                                src='/img/Andry-Meylani-6.jpg'
                                width={800}
                                height={1200}
                                alt='Welcome'
                                className='h-full max-w-[450px] object-cover'
                            />
                        </div>
                    </div>
                    <div className='absolute inset-0 flex items-center flex-col justify-between py-8'>
                        <div className='text-center'>
                            <h2 className='split newsreader text-2xl'>The Wedding of</h2>
                            <h1 className='split !text-4xl'>Andry & Meylani</h1>
                        </div>
                        <h2 className='split newsreader text-2xl'>
                            June<sup>23rd</sup>, 2025
                        </h2>
                    </div>
                </div>
                <div className='text-center'>
                    <h1 className='split'>{guest},</h1>
                    <p className='word'>You're invited to our wedding ceremony</p>
                </div>
            </section>
        )
    );
}
