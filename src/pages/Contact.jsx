import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div className=" flex justify-center h-screen items-center text-center">
      <div
        className="bg-cover w-full h-full "
        style={{
          backgroundImage: "url(https://picsum.photos/800/800)",
        }}>
        <div className="h-[75px]"></div>
        <div className="py-8 flex flex-col justify-center items-center border-4 w-2/3 m-auto bg-slate-400 bg-opacity-60 mt-8">
          <h1 className="text-2xl md:text-4xl">Designed By: Oussama</h1>
          <h1 className="text-xl md:text-3xl mt-3">Oussama Fajraoui</h1>
          <h1 className="text-2xl mt-6 hover:text-white transition-all">
            Follow My Accounts
          </h1>
          <div className="flex justify-center mt-5 text-7xl gap-7 flex-wrap">
            <FaLinkedin
              className="cursor-pointer hover:text-red-700 transition-colors"
              onClick={(e) =>
                (window.location.href =
                  "https://www.linkedin.com/in/oussama-fajraoui%E2%9C%94-59436b22b/")
              }
            />{" "}
            <FaGithub
              className="cursor-pointer hover:text-red-700 transition-colors"
              onClick={(e) =>
                (window.location.href = "https://github.com/Oussama-Fajraoui")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
