import { ReviewForm } from "./_components/review-form";
import { db } from "@/prisma";

const ReviewPage = async ({ params }: { params: { reviewId: string } }) => {
  const review = await db.review.findUnique({
    include: {
      product: {
        include: {
          images: true,
        },
      },
      user: true,
    },
    where: {
      id: params.reviewId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ReviewForm initialData={review} />
      </div>
    </div>
  );
};

export default ReviewPage;
