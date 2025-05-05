import React from "react";
import { Link } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import { Compass, MessageCircle, MessagesSquare, SquarePlus } from "lucide-react";

const Navbar = () => {
  const { sessionUser } = useSessionStore();
  return (
    <header
      className="bg-gradient-to-r from-navbarblue to-navbarpurple border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-[4.5rem] ">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all ml-4">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessagesSquare className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Chatterbox</h1>
          </Link>

          <div className="flex items-center gap-8 rounded-2xl mr-4">
            {sessionUser && (
              <>
                <Link to={"/chat"}>
                  <MessageCircle className= "w-7 h-7 hover:text-primary" />
                </Link>
                <Link to={"/"}>
                  <Compass className= "w-7 h-7 hover:text-primary"/>
                </Link>
                <Link to={"/myposts"}>
                  <SquarePlus className= "w-7 h-7 hover:text-primary"/>
                </Link>
  

                <Link to={"/profile"} className="btn shadow-none btn-ghost h-full flex gap-7 px-2 justify-end items-center rounded-none">
                  <div className="hidden sm:inline">
                    <h2 className="text-lg font-semibold">{sessionUser.fullName}</h2>
                    <p className="text-sm text-gray-400 italic">{sessionUser.email}</p>
                  </div>
                  <img className="w-12 h-12 rounded-full object-cover" src={sessionUser.profilePic || "/avatar.png"} />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
