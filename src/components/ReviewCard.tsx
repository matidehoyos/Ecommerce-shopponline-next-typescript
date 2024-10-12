import React from 'react';

interface Review {
  reviewerName: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className='w-[260px] md:w-[25%] px-2 py-4 text-black flex flex-col justify-start items-center bg-gray-50 border border-gray-300'>
      <h2 className='w-[260px] text-center text-lg md:text-xl font-bold'>{review.reviewerName}</h2>
      <p className='font-bold text-sm text-gray-600'>{new Date(review.date).toISOString().slice(0, 10)}</p>
      <div className="flex">
        {[...Array(5)].map((_, starIndex) => (
          <span key={starIndex} className={starIndex < Math.round(review.rating) ? "text-yellow-600 text-2xl" : "text-gray-500 text-2xl"}>
            ★
          </span>
        ))}
      </div>
      <p className='w-[70%] mt-3 text-gray-700 text-center font-bold text-md'>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;

