import React, { useState } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import SearchForm from '../partials/actions/SearchForm';
import FilterButton from '../components/DropdownFilter';
import CampaignsCard from '../partials/campaigns/CampaignsCard';
import PaginationNumeric from '../components/PaginationNumeric';

import Image01 from '../images/user-28-01.jpg';
import Image02 from '../images/user-28-02.jpg';
import Image03 from '../images/user-28-03.jpg';
import Image04 from '../images/user-28-04.jpg';
import Image05 from '../images/user-28-05.jpg';
import Image06 from '../images/user-28-06.jpg';
import Image07 from '../images/user-28-07.jpg';
import Image08 from '../images/user-28-08.jpg';
import Image09 from '../images/user-28-09.jpg';
import Image10 from '../images/user-28-10.jpg';
import Image11 from '../images/user-28-11.jpg';
import Image12 from '../images/user-28-12.jpg';
import { db } from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import {query, onSnapshot} from 'firebase/firestore'
import {Modal} from '@material-ui/core'
function Campaigns() {
 const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const handleClose = () => {
	setOpen(open)
  }
  const items = [
    {
      id: 0,
      category: '1',
      members: [
        {
          name: 'User 01',
          image: Image01,
          link: '#0'
        },
        {
          name: 'User 02',
          image: Image02,
          link: '#0'
        },
        {
          name: 'User 03',
          image: Image03,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'One-Time'
    },
    {
      id: 1,
      category: '2',
      members: [
        {
          name: 'User 04',
          image: Image04,
          link: '#0'
        },
        {
          name: 'User 05',
          image: Image05,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Off-Track'
    },
    {
      id: 3,
      category: '3',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 08',
          image: Image08,
          link: '#0'
        },
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'At Risk'
    },
    {
      id: 4,
      category: '1',
      members: [
        {
          name: 'User 10',
          image: Image10,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'At Risk'
    },
    {
      id: 5,
      category: '4',
      members: [
        {
          name: 'User 11',
          image: Image11,
          link: '#0'
        },
        {
          name: 'User 05',
          image: Image05,
          link: '#0'
        },
        {
          name: 'User 12',
          image: Image12,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'One-Time'
    },
    {
      id: 6,
      category: '2',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 04',
          image: Image04,
          link: '#0'
        },
        {
          name: 'User 11',
          image: Image11,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'At Risk'
    },
    {
      id: 7,
      category: '4',
      members: [
        {
          name: 'User 01',
          image: Image01,
          link: '#0'
        },
        {
          name: 'User 02',
          image: Image02,
          link: '#0'
        },
        {
          name: 'User 06',
          image: Image06,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'One-Time'
    },
    {
      id: 8,
      category: '1',
      members: [
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
        {
          name: 'User 01',
          image: Image01,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Off-Track'
    },
    {
      id: 9,
      category: '3',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 08',
          image: Image08,
          link: '#0'
        },
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
        {
          name: 'User 06',
          image: Image06,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'One-Time'
    },
    {
      id: 10,
      category: '4',
      members: [
        {
          name: 'User 06',
          image: Image06,
          link: '#0'
        },
        {
          name: 'User 11',
          image: Image11,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Off-Track'
    },
    {
      id: 11,
      category: '2',
      members: [
        {
          name: 'User 05',
          image: Image05,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'Off-Track'
    },
    {
      id: 12,
      category: '3',
      members: [
        {
          name: 'User 07',
          image: Image07,
          link: '#0'
        },
        {
          name: 'User 08',
          image: Image08,
          link: '#0'
        },
        {
          name: 'User 09',
          image: Image09,
          link: '#0'
        },
      ],
      title: 'Monitor progress in Real Time Value',
      link: '#0',
      content: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.',
      dates: {
        from: 'Jan 20',
        to: 'Jan 27'
      },
      type: 'At Risk'
    },
  ];
 const openModal = () => {
  setOpen(!open)
 }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSubmit = (e) => {
	e.preventDefault();
	

	const addUsers = async () => {
	  const contactRef = doc(collection(db, "Campaigns "));

	  await setDoc(contactRef, {
			   title: title,
			   desc: desc,
			   date: date,
			   type: type
	  });
	};
	addUsers();

  };
  useEffect(() => {
	const q = query(collection(db, "Campaigns "));
	onSnapshot(q, (querySnapshot) => {
	  const posts = [];
	  querySnapshot.forEach((doc) => {
		posts.push({ id: doc.id, data: doc.data() });
	  });

	  setPosts(posts);
	});
  }, []);

useEffect(() => {
const getUsers  = async () => {
	 const docRef = doc(db, 'Campaigns ');
	  const docSnap = await getDoc(docRef);
	  if(docSnap.exists()){
		  console.log("document data:", docSnap.data());
	  }else {
		  console.log("No such document!");
	  }
}
getUsers();
},[])
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
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Campaigns ✨</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Search form */}
                <SearchForm />
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Create campaign button */}
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2" onClick={openModal}>Create Campaign</span>
				  <Modal open={open} onClose={handleClose}>
        <>
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
				  placeholder="Description"
                onChange={(e) => setDesc(e.target.value)}
                
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
                  placeholder="Type"
                  type="text"
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
             
              <div class="flex flex-col space-y-5 w-full">
                <button
                  onClick={handleSubmit}
                  class="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
                >
                  Add Campaingn
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>
                </button>
              </div>

            </div>

            {/* Cards */} 
            <div className="grid grid-cols-12 gap-6">
              {
                posts.map(item => {
                  return (
                    <CampaignsCard
                   
                      title={item.data.title}
                      desc={item.data.desc}
                      date={item.data.date}
                      type={item.data.type}
                  
                    />
                  )
                })
              }
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <PaginationNumeric />
            </div>

          </div>
        </main>

      </div>
      
    </div>
  );
}

export default Campaigns;