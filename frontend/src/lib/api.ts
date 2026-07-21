const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface PageContent {
  [key: string]: any;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string | null;
  description: string | null;
  ingredients: string | null;
  nutritional_info: string | null;
  image_url: string | null;
  buy_now_text: string | null;
  buy_now_link: string | null;
  is_new: boolean;
  is_featured: boolean;
  status: string;
  sort_order: number;
}

export interface Recipe {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  prep_time: string | null;
  difficulty: string | null;
  ingredients_list: string | null;
  instructions: string | null;
  serving_size: string | null;
  status: string;
  sort_order: number;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

export async function getPageContent(): Promise<PageContent> {
  try {
    return await fetchApi<PageContent>("/public/content");
  } catch {
    return {};
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    return await fetchApi<Product[]>("/public/products");
  } catch {
    return [];
  }
}

export async function getRecipes(): Promise<Recipe[]> {
  try {
    return await fetchApi<Recipe[]>("/public/recipes");
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    return await fetchApi<Product>(`/public/products/${slug}`);
  } catch {
    return null;
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    return await fetchApi<Recipe>(`/public/recipes/${slug}`);
  } catch {
    return null;
  }
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_date: string | null;
  is_featured: boolean;
  status: string;
  sort_order: number;
}

export async function getNews(): Promise<NewsArticle[]> {
  try {
    return await fetchApi<NewsArticle[]>("/public/news");
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    return await fetchApi<NewsArticle>(`/public/news/${slug}`);
  } catch {
    return null;
  }
}
