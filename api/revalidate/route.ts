import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { secret, paths } = await req.json();

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!Array.isArray(paths)) {
      return NextResponse.json(
        { error: 'paths must be an array' },
        { status: 400 },
      );
    }

    for (const path of paths) {
      await revalidatePath(path, 'layout');
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error('revalidate 실패:', err);
    return NextResponse.json(
      { revalidated: false, error: String(err) },
      { status: 500 },
    );
  }
}
