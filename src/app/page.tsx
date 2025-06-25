'use client';
import AboutSection from '@/components/section/AboutSection';
import HeroSection from '@/components/section/HeroSection';
import StorySection from '@/components/section/StorySection';
import gsap from 'gsap';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import { useImageStore } from './store';
import { ScrollTrigger, SplitText } from 'gsap/all';

const PortraitSection = dynamic(() => import('@/components/section/PortraitSection'), {
    ssr: false,
});

export default function Home() {
    const { loading } = useImageStore();
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
                        start: 'top 90%',
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
                        start: 'top 90%',
                        toggleActions: 'restart none none none',
                    },
                });
            });
            const appearEls = gsap.utils.toArray<HTMLElement>('.appear');
            appearEls.forEach((el, index) => {
                gsap.set(el, {
                    willChange: 'transform,opacity',
                });

                gsap.fromTo(
                    el,
                    {
                        scale: 0,
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        delay: index * 0.1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                        },
                    }
                );
            });
        },
        { dependencies: [loading], scope: container }
    );
    return (
        <main className='space-y-12 mb-12 overflow-x-hidden'>
            <HeroSection />
            <div ref={container} className='space-y-12'>
                {!loading && (
                    <>
                        <AboutSection />
                        <StorySection />
                    </>
                )}
            </div>
            <PortraitSection />
        </main>
    );
}
