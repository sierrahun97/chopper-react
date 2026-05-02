/**
 * blogService.ts
 * Gestiona la persistencia de likes del blog en localStorage.
 * Requerimiento tarea.md: carpeta services/ para datos simulados (Mocks).
 */

import { BLOG_POSTS } from "../data/mockData";

const LIKE_KEY = "blog-likes";

/** Lee los likes almacenados para cada post */
export function getLikes(): number[] {
  try {
    const raw = localStorage.getItem(LIKE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : BLOG_POSTS.map(() => 0);
  } catch {
    return BLOG_POSTS.map(() => 0);
  }
}

/** Persiste el array de likes */
export function saveLikes(likes: number[]): void {
  localStorage.setItem(LIKE_KEY, JSON.stringify(likes));
}

/** Incrementa el like del post en la posición indicada y persiste */
export function incrementLike(likes: number[], index: number): number[] {
  const next = [...likes];
  next[index] = (next[index] ?? 0) + 1;
  saveLikes(next);
  return next;
}
