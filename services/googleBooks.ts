// Google Books API — https://developers.google.com/books/docs/v1
// Set your API key in app.json → extra.googleBooksApiKey, or replace the constant below.

const API_KEY = ''; // leave empty to use the free unauthenticated quota (10 req/s)
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export type GoogleBook = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string;
  categories: string[];
  pageCount: number;
  language: string;
  averageRating?: number;
  previewLink: string;
  infoLink: string;
  publishedDate: string;
};

function parseItem(item: any): GoogleBook {
  const v = item.volumeInfo ?? {};
  const img =
    (v.imageLinks?.extraLarge ||
      v.imageLinks?.large ||
      v.imageLinks?.medium ||
      v.imageLinks?.thumbnail ||
      v.imageLinks?.smallThumbnail ||
      ''
    ).replace('http:', 'https:');

  return {
    id: item.id,
    title: v.title ?? 'Sem título',
    authors: v.authors ?? ['Autor desconhecido'],
    description: (v.description ?? '').replace(/<[^>]+>/g, ''),
    thumbnail: img,
    categories: v.categories ?? [],
    pageCount: v.pageCount ?? 0,
    language: v.language ?? '',
    averageRating: v.averageRating,
    previewLink: v.previewLink ?? '',
    infoLink: v.infoLink ?? '',
    publishedDate: v.publishedDate ?? '',
  };
}

export async function searchBooks(
  query: string,
  maxResults = 10,
  langRestrict?: string,
): Promise<GoogleBook[]> {
  const params = new URLSearchParams({
    q: query,
    maxResults: String(maxResults),
    ...(langRestrict ? { langRestrict } : {}),
    ...(API_KEY ? { key: API_KEY } : {}),
  });

  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error(`Google Books API error: ${res.status}`);
  const data = await res.json();
  return (data.items ?? []).filter((i: any) => i.volumeInfo?.imageLinks).map(parseItem);
}

export async function getBook(id: string): Promise<GoogleBook> {
  const params = API_KEY ? `?key=${API_KEY}` : '';
  const res = await fetch(`${BASE_URL}/${id}${params}`);
  if (!res.ok) throw new Error(`Google Books API error: ${res.status}`);
  const data = await res.json();
  return parseItem(data);
}
