import React, { useEffect, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { useSessionStore } from "../store/useSessionStore";
import { EllipsisVertical } from "lucide-react";
import { formatPostTime } from "../lib/utils";
import { Link } from "react-router-dom";

const Post = ({post}) => {
  const { sessionUser, getUserById } = useSessionStore();
  const { updateCaption, deletePost } = usePostStore();
  const [editedCaption, setEditedCaption] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const res = await getUserById(post.posterId);
          setSelectedUser(res.data.user);
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      };
    
      fetchUser();
  }, [post.posterId])

  const openEditModal = (post) => {
    setEditingPostId(post._id);
    setEditedCaption(post.caption);
    document.getElementById(`update_caption_modal_${post._id}`).showModal();
  };

  const handleUpdateCaption = async (postId, newCaption) => {
    document.getElementById(`update_caption_modal_${post._id}`).close();
    await updateCaption(postId, newCaption);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
  };

  return (
    <div
      className="flex flex-col w-full md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto 
             rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-base-200"
    >
      <div className="flex items-center px-4 py-3 w-full">
        <Link to = {`../posts/${selectedUser?._id}`} className="flex flex-row items-center w-auto">
        <img className="w-10 h-10 rounded-full object-cover" src={selectedUser?.profilePic || "/avatar.png"} alt="profile" />
        <span className="ml-4 font-semibold text-base text-white">{selectedUser?.fullName}</span>
        </Link>
        {sessionUser._id === selectedUser?._id && (
          <>
            <div className="dropdown dropdown-end ml-auto">
              <EllipsisVertical tabIndex={0} className="hover:cursor-pointer" role="button" />
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-10 w-32 p-2 shadow-md">
                <li onClick={() => openEditModal(post)}>
                  <a>Edit Caption</a>
                </li>
                <li onClick={() => handleDeletePost(post._id)}>
                  <a>Delete Post</a>
                </li>
              </ul>
            </div>

            <dialog id= {`update_caption_modal_${post._id}`} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box space-y-4">
                <h2 className="font-bold text-lg">Update Caption</h2>
                <input className="input text-white w-full" type="text" value={editedCaption} onChange={(e) => setEditedCaption(e.target.value)} />
                <div className="flex justify-end">
                  <button
                    className="btn btn-primary hover:cursor-pointer sm:w-auto sm:ml-auto"
                    type="button"
                    onClick={() => handleUpdateCaption(editingPostId, editedCaption)}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </dialog>
          </>
        )}
      </div>

      <img src={post.image} alt="post" className="w-full object-cover" />

      <div className="relative px-4 pt-4 pb-8 bg-base-300">
        {post.caption && <p className="text-base text-base-content mx-2 text-zinc-200 break-words">{post.caption}</p>}
        <span className="absolute bottom-2 right-4 text-xs text-zinc-400">{formatPostTime(post.createdAt)}</span>
      </div>
    </div>
  );
};

export default Post;
