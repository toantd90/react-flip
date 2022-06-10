declare module 'Product-Types' {
  export type Product = {
    id: string;
    title: string;
    description: string;
    url: string;
    votes: number;
    submitterAvatarUrl: string;
    productImageUrl: string;
  };
}
