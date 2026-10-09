type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

type User = {
  id: string;
  name: string;
  age: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type UserApiResponse = ApiResponse<User>;
type ProductApiResponse = ApiResponse<Product>;
