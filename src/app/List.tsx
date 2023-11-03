import Link from "next/link";
import {Post} from "@/pages/api/posts";

// почему на билд он вызывает запрос?
// почему запрос улетает несколько раз?
// почему запрос делается на клиенте а не на сервере? - потому что родительский компонент был клиентским, поэтому этот тоже стал клиентским

// Server Component
const getPosts = async (): Promise<Post[]> => {
    const result = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' }).then((res) => res.json());
    console.log('fetched');
    return result;
}

const PostsList = async ({ counter }: { counter: number }) => {
    const posts = await getPosts();
    //
    // useEffect( () => {
    //     setTimeout(() => setData(posts), 2000);
    // }, [])

    return posts.map((post) => (
        <li key={post.id}>
            <Link href={`/posts/${post.id}`} prefetch={false}>{post.title}</Link>
        </li>
    ));

    // return counter;
}

export default PostsList;