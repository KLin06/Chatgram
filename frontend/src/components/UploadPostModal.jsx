import React, { useRef, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";
import toast from "react-hot-toast";
import { compressImage } from "../lib/utils";
import { usePostStore } from "../store/usePostStore";
import { ImagePlus, Upload, X } from "lucide-react";

const UploadPostModal = ({ className = "" }) => {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { sessionUser } = useSessionStore();
  const fileInputRef = useRef();
  const { addPost } = usePostStore();

  const handlePost = async (e) => {
    e.preventDefault();

    if (!imageFile) return toast.error("Please select an image");

    const compressedImageFile = await compressImage(imageFile, 5);

    const formData = new FormData();
    formData.append("image", compressedImageFile);
    formData.append("caption", caption);
    formData.append("posterId", sessionUser._id);

    try {
      await addPost(formData);

      removeImage();
      document.getElementById("post_modal").close();
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  const removeImage = (e) => {
    e?.stopPropagation();
    setCaption("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <ImagePlus
        className="w-16 h-16 bg-transparent hover:shadow-[0_0_25px_5px_rgba(59,130,246,0.5)] hover:animate-pulse transition duration-600 "
        onClick={() => document.getElementById("post_modal").showModal()}
      />
      <dialog id="post_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="font-bold text-lg">Upload Post</h2>
          <p className="text-sm mt-2 text-zinc-100">Share your experiences</p>
          <div className="modal-action">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("post_modal").close()}>
              ✕
            </button>
            <form className="w-full space-y-5" onSubmit={handlePost} encType="multipart/form-data">
              <div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  ref={fileInputRef}
                />
              </div>
              <div
                type="button"
                className="relative flex flex-col w-full h-60 border border-dashed border-slate-500 rounded-xl hover:cursor-pointer justify-center items-center text-xl object-cover"
                onClick={() => fileInputRef.current?.click()}
              >
                {imageFile ? (
                  <>
                    <img src={URL.createObjectURL(imageFile)} alt="preview" className="w-full h-full object-cover rounded-xl" />
                    <button
                      onClick={(e) => removeImage(e)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 p-1 rounded-full bg-base-300
              flex items-center justify-center hover:bg-zinc-700 transition"
                      type="button"
                    >
                      <X className="size-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <Upload className="mb-3" width={36} height={36} />
                    Select Photo
                  </>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label>Add caption</label>
                <input
                  className="input text-white w-full"
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write caption here..."
                ></input>
              </div>
              <div className="flex justify-end">
                <input className="btn btn-primary hover:cursor-pointer sm:w-auto sm:ml-auto" type="submit" value="Upload" />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UploadPostModal;
