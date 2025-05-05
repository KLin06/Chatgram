import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import Post from "../components/Post";
import { SearchX, LoaderCircle } from "lucide-react";

const UserPostsPage = () => {
  const { userid: userId } = useParams();
  const { getUserPosts, isPostsLoading } = usePostStore();
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getUserPosts(userId);
        if (res) {
          setUserPosts(res.data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, [userId]);

  if (isPostsLoading)
      return (
        <div className="flex w-full h-full justify-center items-center">
          <LoaderCircle className="w-16 h-16 animate-spin" />
        </div>
      );

  if (!userPosts || userPosts.length === 0){
    return (
        <div className="flex flex-col w-full h-full justify-center items-center space-y-5">
            <SearchX width = {80} height = {80}/>
            <h1 className="text-2xl">This user has no posts</h1>
        </div>
    )
  }

  return (
    <div className="flex w-full h-full justify-center relative px-4 py-5 overflow-y-auto">
      {userPosts && (
        <div className="flex flex-col items-center gap-8">
          {userPosts.map((post) => (
            <div className="w-full max-w-2xl px-4" key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostsPage;
