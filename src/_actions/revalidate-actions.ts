"use server";

import {
  revalidateTag as revalidate,
  revalidatePath as path,
} from "next/cache";

export async function revalidateTag(name: string) {
  revalidate(name);
}
export async function revalidatePath(name: string) {
  path(name);
}
