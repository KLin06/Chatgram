import React, { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import UploadPostModal from "../components/UploadPostModal";
import { useSessionStore } from "../store/useSessionStore";
import Post from "../components/Post";
import { SearchX, LoaderCircle } from "lucide-react";

const MyPostsPage = () => {
  const { myPosts, getMyPosts, isPostsLoading } = usePostStore();
  const { sessionUser } = useSessionStore();

  useEffect(() => {
    getMyPosts();
  }, []);

  if (isPostsLoading)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <LoaderCircle className="w-16 h-16 animate-spin" />
      </div>
    );

  if (myPosts.length === 0)
    return (
      <div className="relative flex flex-col w-full h-full justify-center items-center space-y-5">
        <UploadPostModal className="fixed right-8 bottom-8 z-10" />
        <SearchX width={80} height={80} />
        <h1 className="text-2xl">You have no posts</h1>
      </div>
    );

  return (
    <div className="flex w-full h-full justify-center relative px-4 py-5 overflow-y-auto">
      <UploadPostModal className="fixed right-8 bottom-8 z-10" />

      {myPosts && (
        <div className="flex flex-col items-center gap-8">
          {myPosts.map((post) => (
            <div className="w-full max-w-2xl px-4" key={post._id}>
              <Post selectedUserId={sessionUser._id} post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
