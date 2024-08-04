import { getAllShorts } from "@/_actions/video/getAllShorts";
import EmptyState from "@/components/empty-state";
import { ShortCardSkeleton } from "@/components/skeletons/short-card-skeleton";
import { redirect } from "next/navigation";

async function ShortsPage() {
  const data = await getAllShorts();
  const shorts = data?.data || [];
  if (!data || shorts.length === 0)
    return <EmptyState text="No shorts found" />;
  if (shorts.length > 0) {
    redirect(`/shorts/${shorts[0]._id}`);
  }
  return (
    <div className="flex flex-col gap-5 items-center w-full pb-10">
      <ShortCardSkeleton className="max-w-[500px]" height={800} />
    </div>
  );
}

export default ShortsPage;
