import Image from 'next/image';

const stories = [
    {
        title: 'Relationship 2023',
        desc: 'Pertemuan pertama kami yaitu di tempat kerja dimana awalnya hanya sekedar teman berbagi cerita, perlahan rasa itu tumbuh, tanpa kami sadari sudah menjadi bagian penting dalam hidup masing-masing, hingga akhirnya saling menyatakan perasaan yang kami rasakan sejak saat itu kami mulai menjalani hubungan di bulan Oktober 2023.',
    },
    { title: 'Engagement 2025', desc: '' },
    { title: 'Married 2025', desc: '' },
];

export default function StorySection() {
    return (
        <section className='container'>
            <h1 className='split text-center mb-8'>How We Meet</h1>
            <div className='flex max-md:flex-col gap-8 py-8 border-y border-y-zinc-400'>
                <div className='appear flex-1'>
                    <Image
                        src='/img/Love-Story-10.jpg'
                        width={800}
                        height={1000}
                        alt='Love story'
                        className='rounded-2xl min-md:aspect-[4/3] object-[50%_30%] object-cover h-full'
                    />
                </div>
                <div className='flex-1 space-y-4'>
                    {stories.map(({ title, desc }) => (
                        <div key={title}>
                            <h2 className='split newsreader mb-2 text-xl font-medium'>
                                {title}
                            </h2>
                            <p className='word text-justify'>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
