import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { secret, paths } = await req.json();

    if (!secret || secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(paths)) {
      return NextResponse.json({ error: "paths must be an array" }, { status: 400 });
    }

    await Promise.all(
      paths.map(async (path) => {
        try {
          await revalidatePath(path, "layout");
        } catch (err) {
          console.error(`❌ Failed to revalidate path: ${path}`, err);
        }
      }),
    );

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("revalidate 실패:", err);
    return NextResponse.json({ revalidated: false, error: String(err) }, { status: 500 });
  }
}
