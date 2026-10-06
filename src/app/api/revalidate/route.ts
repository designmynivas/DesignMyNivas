import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Called by the admin panel after every create/update/delete so the public
 * site shows the change on the next visit instead of after the 60s ISR window.
 * Only signed-in admins may trigger it.
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  // Every public page reads projects, testimonials or blogs
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true });
}
