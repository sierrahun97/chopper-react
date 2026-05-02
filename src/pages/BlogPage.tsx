import { useState } from "react";
import { BLOG_POSTS, TRANSPARENT_PIXEL } from "../data/mockData";
import { getLikes, incrementLike } from "../services/blogService";

export function BlogPage() {
  const [likes, setLikes] = useState<number[]>(() => getLikes());

  return (
    <main>
      <section className="slogan-text home-hero">
        <h2>Tips para cuidar y criar a tu mascota</h2>
      </section>

      <section className="section-blog">
        {BLOG_POSTS.map((post, index) => (
          <article className="blog-card" key={post.id}>
            <div className="card-img">
              {/* TODO: reemplazar post.image con la imagen real del blog */}
              <img src={post.image || TRANSPARENT_PIXEL} alt="blog-chopper" />
            </div>
            <div className="text-card">
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <button
                className="likeButton"
                onClick={() => setLikes((prev) => incrementLike(prev, index))}
              >
                Me gusta
              </button>
              <span className="likeCount"> {likes[index] ?? 0}</span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
