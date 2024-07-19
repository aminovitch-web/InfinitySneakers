import { format } from "date-fns";

import ReviewsClient from "./_components/client";
import { db } from "@/prisma";
import { ReviewColumn } from "./_components/columns";

const ReviewsPage = async () => {
  const reviews = await db.review.findMany({
    include: {
      product: {
        include: {
          images: true,
        },
      },
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedReviews: ReviewColumn[] = reviews.map((item) => ({
    id: item.id,
    image: item.product.images[0].url,
    isApproved: item.isApproved,
    name:
      `${item?.user?.name}` +
      `${item.user.surname !== null ? item.user.surname : ""}`,
    productName: item.product.name,
    content: item.content,
    rating: item.rating,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ReviewsClient data={formattedReviews} />
      </div>
    </div>
  );
};

export default ReviewsPage;
