import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';

const picts = [
    {
        name: 'Bripda Andry Septian Ady',
        desc: 'Putra Kedua dari Bapak Saidi & Ibu Suminingsih',
        link: 'http://www.instagram.com/andry.sa',
    },
    {
        name: 'Bripda Meylani Shifa Adila',
        desc: 'Putri Pertama dari Bapak Muhammad Radi & Ibu Heny Suwarni Astie',
        link: 'http://www.instagram.com/meylanishifaa',
    },
];

export default function AboutSection() {
    return (
        <section className='container text-center'>
            <h1 className='split'>Bride and Groom</h1>
            <p className='word mb-8'>
                With the grace and blessing of Allah SWT, the honor of your presence is
                requested at the marriage of :
            </p>
            <div className='flex max-md:flex-col gap-12 justify-center'>
                {picts.map((pic, id) => (
                    <div key={id} className='flex flex-col gap-2 items-center relative'>
                        <Image
                            src='/assets/flower.png'
                            height={400}
                            width={200}
                            alt='flower'
                            className={cn(
                                'absolute h-auto w-[150px] -top-10 object-contain',
                                id === 0 ? '-left-15' : '-right-10'
                            )}
                        />
                        <Image
                            src={`/img/Andry-Meylani-${id + 10}.jpg`}
                            width={800}
                            height={1000}
                            alt={pic.name}
                            className='appear aspect-[4/5] object-cover object-top rounded-2xl mb-4'
                        />
                        <h2 className='split newsreader text-2xl'>{pic.name}</h2>
                        <p className='word'>{pic.desc}</p>
                        <Link
                            href={pic.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-4 p-3 px-4 rounded-full ring-2 ring-gray-200 w-fit'>
                            <FaInstagram size={18} />
                            {'@' + pic.link.split('/').at(-1)}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
