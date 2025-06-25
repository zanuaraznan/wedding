import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    const imgDir = path.join(process.cwd(), 'public', 'img');

    const filenames = await fs.readdir(imgDir);
    const imageUrls = filenames.map((name) => `/img/${name}`);

    return NextResponse.json(
        { imageUrls },
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
