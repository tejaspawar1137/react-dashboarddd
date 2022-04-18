import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { setDoc, doc, getDoc, addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import UserImage05 from "../../images/user-32-05.jpg";
import UserImage07 from "../../images/user-32-07.jpg";
import UserImage08 from "../../images/user-32-08.jpg";
import { useNavigate } from "react-router-dom";
import { Modal } from "@material-ui/core";
import { async } from "@firebase/util";
function TasksList() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  console.log(posts,'posts');
  const [title, setTitle] = useState("");
  const [like, setLike] = useState("");
  const [BrowserData, setBrowserData] = useState([]);
  console.log(BrowserData, "browserdata");
  const [comment, setComment] = useState("");

 

  const openModal = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
         if(title && like && comment){
			const addUsers = async () => {
				const contactRef = doc(collection(db, "Users"));
		  
				await setDoc(contactRef, {
				  title: title,
				  like: like,
				  comment: comment,
				});
			  };
			  addUsers();
			  setLike('')
			  setComment('')
			  setTitle('')
			  setOpen(!open)
		 }else {
			 alert("all Fields are necessary")
		 }

  };

  useEffect(() => {
    const q = query(collection(db, 'Users'))
    onSnapshot(q, (querySnapshot) => {
      const posts = []
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, data: doc.data() })
      })

      setPosts(posts)
    })
  }, [])

  useEffect(() => {
    const getUsers = async () => {
		const docRef = doc(db, "Users", );
		
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Smaller container */}
            <div className="max-w-3xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-8">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">
                    Acme Inc. Tasks ✨
                  </h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-4">
                  {/* Avatars */}
                  <div className="flex shrink-0 -space-x-3 -ml-px">
                    <a className="block" href="#0">
                      <img
                        className="rounded-full border-2 border-slate-100 box-content"
                        src={UserImage08}
                        width="32"
                        height="32"
                        alt="User 08"
                      />
                    </a>
                    <a className="block" href="#0">
                      <img
                        className="rounded-full border-2 border-slate-100 box-content"
                        src={UserImage07}
                        width="32"
                        height="32"
                        alt="User 07"
                      />
                    </a>
                    <a className="block" href="#0">
                      <img
                        className="rounded-full border-2 border-slate-100 box-content"
                        src={UserImage05}
                        width="32"
                        height="32"
                        alt="User 05"
                      />
                    </a>
                    <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150 ml-2">
                      <span className="sr-only">Add new user</span>
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 12 12">
                        <path d="M11 5H7V1a1 1 0 0 0-2 0v4H1a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0V7h4a1 1 0 0 0 0-2Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Add taks button */}
                  <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg
                      className="w-4 h-4 fill-current opacity-50 shrink-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="ml-2" onClick={openModal}>
                      Add Task
                    </span>
                    <Modal open={open} onClose={handleClose}>
                      <div class="min-h-screen flex justify-center items-center bg-transparent">
                        <div class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col bg-white items-center space-y-3">
						<ArrowBackIosIcon style={{cursor:"pointer"}} onClick={() => setOpen(!open)} />
                          <input
                            class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                          />
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
                  </button>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-6">
                <div>
                  <h2 className="grow font-semibold text-slate-800 truncate mb-4">
                    To Do's 🖋️
                  </h2>
                  <div className="space-y-2">
				  {posts.map((item, index) => (
					<div
                      className="bg-white shadow-lg rounded-sm border border-slate-200 p-4"
                      draggable="true"
                    >
                      <div className="sm:flex sm:justify-between sm:items-start">
                        <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                          <div className="flex items-center">
                            <button className="cursor-move mr-2">
                              <span className="sr-only">Drag</span>
                              <svg
                                className="w-3 h-3 fill-slate-500"
                                viexbox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                  fill="#CBD5E1"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>

                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                              />
                              <span className="font-medium text-slate-800 peer-checked:line-through ml-2">{item.data.title}</span>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center justify-end space-x-3">
                          <div className="flex shrink-0 -space-x-3 -ml-px">
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage07}
                                width="24"
                                height="24"
                                alt="User 07"
                              />
                            </a>
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage05}
                                width="24"
                                height="24"
                                alt="User 05"
                              />
                            </a>
                          </div>

                          <button className="flex items-center text-slate-400 hover:text-indigo-500">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M14.682 2.318A4.485 4.485 0 0011.5 1 4.377 4.377 0 008 2.707 4.383 4.383 0 004.5 1a4.5 4.5 0 00-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 014.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 011.785 4.251h-.003z" />
                            </svg>
                            <div className="text-sm text-slate-500">{item.data.like}</div>
                          </button>

                          <button className="flex items-center text-slate-400 hover:text-indigo-500">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 0C3.6 0 0 3.1 0 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L8.9 12H8c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                            </svg>
                            <div className="text-sm text-slate-500">{item.data.comment}</div>
                          </button>

                          <button className="text-slate-400 hover:text-indigo-500">
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
				  ))}
             

              
                    {/* Task */}
                 
                  </div>
                </div>

                {/* Group 2 */}
                <div>
                  <h2 className="grow font-semibold text-slate-800 truncate mb-4">
                    In Progress ✌️
                  </h2>
                  <div className="space-y-2">
                    {/* Task */}
                    <div
                      className="bg-white shadow-lg rounded-sm border border-slate-200 p-4"
                      draggable="true"
                    >
                      <div className="sm:flex sm:justify-between sm:items-start">
                        {/* Left side */}
                        <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                          <div className="flex items-center">
                            {/* Drag button */}
                            <button className="cursor-move mr-2">
                              <span className="sr-only">Drag</span>
                              <svg
                                className="w-3 h-3 fill-slate-500"
                                viexbox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                  fill="#CBD5E1"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                            {/* Checkbox button */}
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                              />
                              <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                Managing teams (book)
                              </span>
                            </label>
                          </div>
                          {/* Nested checkboxes */}
                          <ul className="pl-12 space-y-3">
                            <li>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                  defaultChecked
                                />
                                <span className="text-sm text-slate-800 peer-checked:line-through ml-3">
                                  Finish the presentation
                                </span>
                              </label>
                            </li>
                            <li>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                />
                                <span className="text-sm text-slate-800 peer-checked:line-through ml-3">
                                  Finish the design
                                </span>
                              </label>
                            </li>
                            <li>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                />
                                <span className="text-sm text-slate-800 peer-checked:line-through ml-3">
                                  Publish the content
                                </span>
                              </label>
                            </li>
                          </ul>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center justify-end space-x-3">
                          {/* Avatars */}
                          <div className="flex shrink-0 -space-x-3 -ml-px">
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage05}
                                width="24"
                                height="24"
                                alt="User 05"
                              />
                            </a>
                          </div>
                          {/* To-do info */}
                          <div className="flex items-center text-slate-400 ml-3">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.974 14c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6z" />
                            </svg>
                            <div className="text-sm text-slate-500">1/3</div>
                          </div>
                          {/* Attach button */}
                          <button className="text-slate-400 hover:text-indigo-500">
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

                    {/* Task */}
                    <div
                      className="bg-white shadow-lg rounded-sm border border-slate-200 p-4"
                      draggable="true"
                    >
                      <div className="sm:flex sm:justify-between sm:items-start">
                        {/* Left side */}
                        <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                          <div className="flex items-center">
                            {/* Drag button */}
                            <button className="cursor-move mr-2">
                              <span className="sr-only">Drag</span>
                              <svg
                                className="w-3 h-3 fill-slate-500"
                                viexbox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                  fill="#CBD5E1"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                            {/* Checkbox button */}
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                              />
                              <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                Product Update - Q4 2021
                              </span>
                            </label>
                          </div>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center justify-end space-x-3">
                          {/* Date */}
                          <div className="flex items-center text-amber-500">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                            </svg>
                            <div className="text-sm text-amber-600">Mar 27</div>
                          </div>
                          {/* Attach button */}
                          <button className="text-slate-400 hover:text-indigo-500">
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

                    {/* Task */}
                    <div
                      className="bg-white shadow-lg rounded-sm border border-slate-200 p-4"
                      draggable="true"
                    >
                      <div className="sm:flex sm:justify-between sm:items-start">
                        {/* Left side */}
                        <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                          <div className="flex items-center">
                            {/* Drag button */}
                            <button className="cursor-move mr-2">
                              <span className="sr-only">Drag</span>
                              <svg
                                className="w-3 h-3 fill-slate-500"
                                viexbox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                  fill="#CBD5E1"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                            {/* Checkbox button */}
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                              />
                              <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                Design marketing assets
                              </span>
                            </label>
                          </div>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center justify-end space-x-3">
                          {/* Avatars */}
                          <div className="flex shrink-0 -space-x-3 -ml-px">
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage07}
                                width="24"
                                height="24"
                                alt="User 07"
                              />
                            </a>
                          </div>
                          {/* Date */}
                          <div className="flex items-center text-amber-500">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                            </svg>
                            <div className="text-sm text-amber-600">Mar 27</div>
                          </div>
                          {/* Attach button */}
                          <button className="text-slate-400 hover:text-indigo-500">
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
                  </div>
                </div>

                {/* Group 3 */}
                <div>
                  <h2 className="grow font-semibold text-slate-800 truncate mb-4">
                    Completed 🎉
                  </h2>
                  <div className="space-y-2">
                    {/* Task */}
                    <div
                      className="bg-white shadow-lg rounded-sm border border-slate-200 p-4 opacity-60"
                      draggable="true"
                    >
                      <div className="sm:flex sm:justify-between sm:items-start">
                        {/* Left side */}
                        <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                          <div className="flex items-center">
                            {/* Drag button */}
                            <button className="cursor-move mr-2">
                              <span className="sr-only">Drag</span>
                              <svg
                                className="w-3 h-3 fill-slate-500"
                                viexbox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                  fill="#CBD5E1"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                            {/* Checkbox button */}
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                defaultChecked
                              />
                              <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                Design new diagrams
                              </span>
                            </label>
                          </div>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center justify-end space-x-3">
                          {/* Avatars */}
                          <div className="flex shrink-0 -space-x-3 -ml-px">
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage08}
                                width="24"
                                height="24"
                                alt="User 08"
                              />
                            </a>
                          </div>
                          {/* To-do info */}
                          <div className="flex items-center text-slate-400 ml-3">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.974 14c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6z" />
                            </svg>
                            <div className="text-sm text-slate-500">3/3</div>
                          </div>
                          {/* Attach button */}
                          <button className="text-slate-400 hover:text-indigo-500">
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

                    {/* Task */}
                    <div
                      className="bg-white shadow-lg rounded-sm border border-slate-200 p-4 opacity-60"
                      draggable="true"
                    >
                      <div className="sm:flex sm:justify-between sm:items-start">
                        {/* Left side */}
                        <div className="grow mt-0.5 mb-3 sm:mb-0 space-y-3">
                          <div className="flex items-center">
                            {/* Drag button */}
                            <button className="cursor-move mr-2">
                              <span className="sr-only">Drag</span>
                              <svg
                                className="w-3 h-3 fill-slate-500"
                                viexbox="0 0 12 12"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z"
                                  fill="#CBD5E1"
                                  fillRule="evenodd"
                                />
                              </svg>
                            </button>
                            {/* Checkbox button */}
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                className="peer focus:ring-0 focus-visible:ring w-5 h-5 bg-white border border-slate-200 text-indigo-500 rounded-full"
                                defaultChecked
                              />
                              <span className="font-medium text-slate-800 peer-checked:line-through ml-2">
                                Update the contact page
                              </span>
                            </label>
                          </div>
                        </div>
                        {/* Right side */}
                        <div className="flex items-center justify-end space-x-3">
                          {/* Avatars */}
                          <div className="flex shrink-0 -space-x-3 -ml-px">
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage08}
                                width="24"
                                height="24"
                                alt="User 08"
                              />
                            </a>
                            <a className="block" href="#0">
                              <img
                                className="rounded-full border-2 border-white box-content"
                                src={UserImage07}
                                width="24"
                                height="24"
                                alt="User 07"
                              />
                            </a>
                          </div>
                          {/* To-do info */}
                          <div className="flex items-center text-slate-400 ml-3">
                            <svg
                              className="w-4 h-4 shrink-0 fill-current mr-1.5"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.974 14c-.3 0-.7-.2-.9-.5l-2.2-3.7-2.1 2.8c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l3-4c.2-.3.5-.4.9-.4.3 0 .6.2.8.5l2 3.3 3.3-8.1c0-.4.4-.7.8-.7s.8.2.9.6l4 8c.2.5 0 1.1-.4 1.3-.5.2-1.1 0-1.3-.4l-3-6-3.2 7.9c-.2.4-.6.6-1 .6z" />
                            </svg>
                            <div className="text-sm text-slate-500">2/2</div>
                          </div>
                          {/* Attach button */}
                          <button className="text-slate-400 hover:text-indigo-500">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TasksList;
