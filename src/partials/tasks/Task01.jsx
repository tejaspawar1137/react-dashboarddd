import React from "react";
import { useState, useEffect } from "react";

import UserImage01 from "../../images/user-28-07.jpg";
import { db } from "../../firebase";
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import UserImage02 from "../../images/user-28-11.jpg";
import { Modal } from "@material-ui/core";
function Task01() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
  console.log(desc);
  const [like, setLike] = useState("");
  const [comment, setComment] = useState("");
  const openModal = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(open);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && desc && like && comment) {
      const addUsers = async () => {
        const contactRef = doc(collection(db, "Todos"));

        await setDoc(contactRef, {
          title: title,
          desc: desc,
          like: like,
          comment: comment,
        });
      };
      setOpen(!open);
      addUsers();
      setLike("");
      setComment("");
      setTitle("");
    } else {
      alert("all Fields are necessary");
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Todos"));
    onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, data: doc.data() });
      });

      setPosts(posts);
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, "Todos");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getUsers();
  }, []);
  return (
    <>
      <button
        onClick={openModal}
        className="shrink-0 text-indigo-500 hover:text-indigo-600 ml-2"
        style={{ position: "relative", top: "-25px", left: "250px" }}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
      </button>
      <Modal open={open} onClose={handleClose}>
        <div class="min-h-screen flex justify-center items-center bg-transparent">
          <div class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col bg-white items-center space-y-3">
            <input
              class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Description"
                type="text"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Like"
                type="number"
                onChange={(e) => setLike(e.target.value)}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Comment"
                type="number"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div class="flex flex-col space-y-5 w-full">
              <button
                onClick={handleSubmit}
                class="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
              >
                Add Tasks
              </button>
            </div>
          </div>

          <div class="absolute bottom-0 w-full p-3 bg-[#F7F9FA] flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666]">
            <a
              href="https://www.paypal.com/us/smarthelp/contact-us"
              target="_blank"
              class="hover:underline underline-offset-1 cursor-pointer"
            >
              Contact Us
            </a>
            <a
              href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full"
              target="_blank"
              class="hover:underline underline-offset-1 cursor-pointer"
            >
              Privacy
            </a>
            <a
              href="https://www.paypal.com/de/webapps/mpp/ua/legalhub-full"
              target="_blank"
              class="hover:underline underline-offset-1 cursor-pointer"
            >
              Legal
            </a>
            <a
              href="https://www.paypal.com/de/webapps/mpp/ua/upcoming-policies-full"
              target="_blank"
              class="hover:underline underline-offset-1 cursor-pointer"
            >
              Policy{" "}
            </a>
            <a
              href="https://www.paypal.com/de/webapps/mpp/country-worldwide"
              target="_blank"
              class="hover:underline underline-offset-1 cursor-pointer"
            >
              Worldwide{" "}
            </a>
          </div>
        </div>
      </Modal>


      {posts.map((item, index) => {
		  return (
			  <>
			  <div key={index} className="bg-white shadow-lg rounded-sm border border-slate-200 p-4">
        <div className="mb-3">
          <h2 className="font-semibold text-slate-800 mb-1">
            {item.data.title}
          </h2>

          <div>
            <div className="text-sm">
               {item.data.desc}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex shrink-0 -space-x-3 -ml-px">
            <a className="block" href="#0">
              <img
                className="rounded-full border-2 border-white box-content"
                src={UserImage01}
                width="28"
                height="28"
                alt="User 07"
              />
            </a>
            <a className="block" href="#0">
              <img
                className="rounded-full border-2 border-white box-content"
                src={UserImage02}
                width="28"
                height="28"
                alt="User 11"
              />
            </a>
          </div>

          <div className="flex items-center">
            <button className="flex items-center text-slate-400 hover:text-indigo-500 ml-3">
              <svg
                className="w-4 h-4 shrink-0 fill-current mr-1.5"
                viewBox="0 0 16 16"
              >
                <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
              </svg>
              <div className="text-sm text-slate-500">4</div>
            </button>

            <button className="flex items-center text-slate-400 hover:text-indigo-500 ml-3">
              <svg
                className="w-4 h-4 shrink-0 fill-current mr-1.5"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
              </svg>
              <div className="text-sm text-slate-500">7</div>
            </button>

            <button className="text-slate-400 hover:text-indigo-500 ml-3">
              <svg
                className="w-4 h-4 shrink-0 fill-current mr-1.5"
                viewBox="0 0 16 16"
              >
                <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0zM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
			  </>
		  )
	  })}
    </>
  );
}

export default Task01;
