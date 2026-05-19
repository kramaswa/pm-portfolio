import { NextRequest, NextResponse } from "next/server";
import { createReadClient, createServiceClient } from "@/lib/supabase-server";
import { jwtVerify } from "jose";

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  const supabase = createReadClient();
  const query = supabase.from("site_settings").select("key, value");
  if (key) query.eq("key", key);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key, value } = await request.json();
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
