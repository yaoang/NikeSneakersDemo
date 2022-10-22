export type AuthorType = {
  id: string;
  name: string;
};

export interface ShoeProps {
  id: string;
  title: string;
  type: string;
  publishedAt: string;
  stock: number;
  price: string;
  // authors: { author: AuthorType }[];
  averageRating: number;
  ratings: number;
}

export interface shoppingCartItemProps extends ShoeProps {
  quantity: number;
}

export type BookDetailProps = Omit<
  ShoeProps,
  "averageRating" | "ratings"
>;

export interface BookRatingsProps {
  bookId: string;
  userId: string;
  score: number;
  ratedAt: string;
  user: {
    id: string;
    nickname: string;
  };
}

export const starLabels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
