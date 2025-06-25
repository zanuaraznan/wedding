'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { useImageStore } from '@/app/store';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useEffect, useRef, useState } from 'react';

export default function PortraitSection() {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [dataLoad, setDataLoad] = useState(true);
    const [loadedCount, setLoadedCount] = useState(0);
    const container = useRef<HTMLDivElement>(null);
    const { loading } = useImageStore(); // global store untuk mount control

    // Fetch image data
    useEffect(() => {
        async function fetchImage() {
            try {
                const res = await fetch('/api/images');
                if (!res.ok) throw new Error('Internal server error');
                const data = await res.json();
                setImageUrls(data.imageUrls);
            } catch (err) {
                console.error(err);
            } finally {
                setDataLoad(false);
            }
        }

        if (!loading) fetchImage();
    }, [loading]);

    const allImagesLoaded =
        imageUrls.length > 0 && loadedCount === imageUrls.length && !dataLoad;

    // GSAP Animation after all images are loaded
    useGSAP(
        () => {
            if (!allImagesLoaded) return;

            gsap.registerPlugin(SplitText, ScrollTrigger);

            const splitEls = gsap.utils.toArray<HTMLElement>('.split');
            splitEls.forEach((el) => {
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
                    },
                });
            });

            const appearEls = gsap.utils.toArray<HTMLElement>('.appear');
            appearEls.forEach((el, index) => {
                gsap.fromTo(
                    el,
                    { scale: 0, opacity: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        delay: index * 0.2,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 90%',
                            markers: true,
                            toggleActions: 'restart none none none',
                        },
                    }
                );
            });
        },
        { dependencies: [allImagesLoaded], scope: container }
    );

    return (
        !loading && (
            <section ref={container} className='bg-zinc-900 text-white py-8'>
                <div className='container'>
                    <h1 className='split text-center mb-8'>Portrait of Us</h1>
                    <div className='columns-1 md:columns-3 gap-4'>
                        {dataLoad ? (
                            <p>Loading...</p>
                        ) : (
                            imageUrls.map((url, id) => (
                                <Image
                                    key={id}
                                    src={url}
                                    alt={url.split('/').at(-1)!}
                                    width={1200}
                                    height={1200}
                                    onLoad={() => setLoadedCount((prev) => prev + 1)}
                                    className='appear w-full h-full aspect-auto object-cover rounded-2xl mb-4'
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>
        )
    );
}
