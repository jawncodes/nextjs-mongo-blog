import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post }) {
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const publishPost = async (postId) => {
    setPublishing(true);

    try {
      const res = await fetch(`/api/posts`, {
        method: 'PUT',
        body: postId,
      });

      if (res.ok) {
        setPublishing(false);
        router.reload();
      } else {
        setPublishing(false);
        alert('Something went wrong');
      }

      return router.push(router.asPath);
    } catch (err) {
      setPublishing(false);
      console.error(err);
      return;
    }
  };

  const deletePost = async (postId) => {
    setDeleting(true);

    try {
      const res = await fetch(`/api/posts`, {
        method: 'DELETE',
        body: postId,
      });

      if (res.ok) {
        setDeleting(false);
        router.reload();
      } else {
        setDeleting(false);
        alert('Something went wrong');
      }

      return router.push(router.asPath);
    } catch (err) {
      setDeleting(false);
      console.error(err);
      return;
    }
  };

  return (
    <>
      <li>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        <br />
        {!post.published && (
          <button onClick={() => publishPost(post._id)}>
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        )}
        <button onClick={() => deletePost(post._id)}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </li>
    </>
  );
}
