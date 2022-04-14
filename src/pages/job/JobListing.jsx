import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import JobSidebar from '../../partials/job/JobSidebar';
import DropdownSort from '../../components/DropdownSort';
import JobListItem from '../../partials/job/JobListItem';
import PaginationNumeric from '../../components/PaginationNumeric';
import { Modal } from '@material-ui/core';
import Image01 from '../../images/company-icon-05.svg';
import Image02 from '../../images/company-icon-06.svg';
import Image03 from '../../images/company-icon-03.svg';
import Image04 from '../../images/company-icon-07.svg';
import Image05 from '../../images/company-icon-08.svg';
import Image06 from '../../images/company-icon-01.svg';
import Image07 from '../../images/company-icon-02.svg';
import { db } from "../../firebase";
import { ref, getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
function JobListing() {

  const items = [
    {
      id: 0,
      image: Image01,
      company: 'Company 01',
      role: 'Senior Web App Designer',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 4',
      type: 'Featured',
      fav: false,
    },
    {
      id: 1,
      image: Image01,
      company: 'Company 02',
      role: 'Senior Full Stack Engineer',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 7',
      type: 'New',
      fav: true,
    },
    {
      id: 2,
      image: Image02,
      company: 'Company 03',
      role: 'Ruby on Rails Engineer',
      link: '/job/job-post',
      details: 'Contract / Remote / New York, NYC',
      date: 'Jan 7',
      type: 'New',
      fav: false,
    },
    {
      id: 3,
      image: Image03,
      company: 'Company 04',
      role: 'Senior Software Engineer Backend',
      link: '/job/job-post',
      details: 'Full-time / Remote / Anywhere',
      date: 'Jan 7',
      type: 'New',
      fav: false,
    },
    {
      id: 4,
      image: Image04,
      company: 'Company 05',
      role: 'React.js Software Developer',
      link: '/job/job-post',
      details: 'Full-time / Remote / London, UK',
      date: 'Jan 6',
      type: 'New',
      fav: true,
    },
    {
      id: 5,
      image: Image05,
      company: 'Company 06',
      role: 'Senior Full Stack Rails Developer',
      link: '/job/job-post',
      details: 'Part-time / Remote / Milan, IT',
      date: 'Jan 6',
      type: 'New',
      fav: false,
    },
    {
      id: 6,
      image: Image06,
      company: 'Company 07',
      role: 'Principal Software Engineer',
      link: '/job/job-post',
      details: 'Freelance / Remote / London, UK',
      date: 'Jan 6',
      type: 'New',
      fav: false,
    },
    {
      id: 7,
      image: Image04,
      company: 'Company 08',
      role: 'Contract React Native Engineer',
      link: '/job/job-post',
      details: 'Contract / Remote / Miami, FL',
      date: 'Jan 6',
      type: 'New',
      fav: false,
    },
    {
      id: 8,
      image: Image05,
      company: 'Company 09',
      role: 'Senior Client Engineer (React & React Native)',
      link: '/job/job-post',
      details: 'Full-time / Remote / Lincoln, NE',
      date: 'Jan 5',
      type: 'New',
      fav: false,
    },
    {
      id: 9,
      image: Image07,
      company: 'Company 10',
      role: 'QA Automation Engineer',
      link: '/job/job-post',
      details: 'Contract / Remote / Anywhere',
      date: 'Jan 5',
      type: 'New',
      fav: false,
    },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);
 const storage = getStorage()
  const [jobtitle, setJobtitle] = useState("");
  const [jobaddress, setJobaddress] = useState("");
  const [date, setDate] = useState("");
  const [timestamp, setTimestamp] = useState("")
  const [image, setImage] = useState([]);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false)
 const openModal = () => {
   setOpen(!open)
 }
 const handleSubmit = (e) => {
    e.preventDefault();

    const addUsers = async () => {
      const contactRef = doc(collection(db, "Jobs"));

      await setDoc(contactRef, {
        jobtitle: jobtitle,
        jobaddress: jobaddress,
        date: date,
          timestamp: timestamp,
        image: image,
      });
    };
    addUsers();
     setOpen(!open)
    setJobtitle("");
    setJobaddress("");
    setDate("");
    setTimestamp("");
    setImage("");
  };
  useEffect(() => {
    const q = query(collection(db, "Jobs"));
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
      const docRef = doc(db, "Jobs");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getUsers();
  }, []);
 const handleClose = () => {
     setOpen(open)
 }
 const handleUploadImage = (e) => {
    let profileImage = e.target.files[0];
    const storageRef = ref(storage, `images/${profileImage.name}`);
    uploadBytes(storageRef, profileImage)
      .then((snapshot) => {
        getDownloadURL(storageRef, profileImage)
          .then((url) => {
            setImage(url);
            console.log(url, "url");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
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

            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-5">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Search For Jobs ✨</h1>
              </div>

              {/* Post a job button */}
              <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                <span className="hidden xs:block ml-2" onClick={openModal}>Post A Job</span>
              </button>
			  <Modal open={open} onClose={handleClose}>
        <div class="min-h-screen flex justify-center items-center bg-transparent">
          <div class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col bg-white items-center space-y-3">
            <input
              class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
              placeholder="Job Title"
              onChange={(e) => setJobtitle(e.target.value)}
            />
                 <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Job Address"
                type="text"
                onChange={(e) => setJobaddress(e.target.value)}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Timestamp"
                type="text"
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
            <div class="flex flex-col space-y-1">
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Status"
                type="file"
                onChange={handleUploadImage}
              />
            </div>
            <div class="flex flex-col space-y-5 w-full">
              <button
                onClick={handleSubmit}
                class="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
              >
                Add Jobs
              </button>
            </div>
          </div>

      
        </div>
      </Modal>
            </div>

            {/* Page content */}
            <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">

              {/* Sidebar */}
              <JobSidebar />

              {/* Content */}
              <div className='w-full'>

                {/* Search form */}
                <div className="mb-5">
                  <form className="relative">
                    <label htmlFor="job-search" className="sr-only">Search</label>
                    <input id="job-search" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search job title or keyword…" />
                    <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                      <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                      </svg>
                    </button>
                  </form>
                </div>

                {/* Jobs header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-slate-500 italic">Showing 289 Jobs</div>
                  {/* Sort */}
                  <div className="text-sm">
                    <span>Sort by </span>
                    <DropdownSort align="right" />
                  </div>
                </div>

                {/* Jobs list */}
                <div className='space-y-2'>
                  {posts.map((item) => {
                    return (
                      <JobListItem
                         jobtitle={item.data.jobtitle}
                        image={item.data.image}
                        jobaddress={item.data.jobaddress}
                         date={item.data.date}
                         timestamp={item.data.timestamp}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                <div className="mt-6">
                  <PaginationNumeric />
                </div>

              </div>

            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default JobListing;