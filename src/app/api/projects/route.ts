import { NextRequest, NextResponse } from "next/server";
import { createReadClient, createServiceClient } from "@/lib/supabase-server";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

function getSecret() {
  return new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);
}

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const supabase = createReadClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .neq("status", "Archived")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: body.title,
        description: body.description,
        long_description: body.long_description ?? null,
        tags: body.tags ?? [],
        link: body.link ?? null,
        screenshot_url: body.screenshot_url ?? null,
        status: body.status ?? "Live",
        featured: body.featured ?? false,
        order_index: body.order_index ?? 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  revalidatePath("/");
  return NextResponse.json(data, { status: 201 });
}
