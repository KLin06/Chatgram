import React, { useEffect, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { SearchX , LoaderCircle} from "lucide-react";
import Post from "../components/Post";

const HomePage = () => {
  const { getFeed,  isFeedLoading } = usePostStore();
  const [feed, setFeed ] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const res = await getFeed();
      setFeed(res.data.feed);
    };

    fetchFeed();
  }, []);

  if(isFeedLoading) return (
    <div className="flex w-full h-full justify-center items-center"><LoaderCircle className="w-16 h-16 animate-spin" /></div>
  )

  if (feed.length === 0) return (
    <div className="flex flex-col w-full h-full justify-center items-center space-y-5">
        <SearchX width = {80} height = {80}/>
        <h1 className="text-2xl">Your feed is empty</h1>
    </div>
  )

  return (
    <div className="flex w-full h-full justify-center relative px-4 py-5 overflow-y-auto">
      {feed && (
        <div className="flex flex-col items-center gap-8">
          {feed.map((post) => (
            <div className="w-full max-w-2xl px-4" key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
