import React, { useEffect } from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import UserImage from "../../images/user-64-14.jpg";
import FintechIcon01 from "../../images/company-icon-01.svg";
import FintechIcon02 from "../../images/company-icon-02.svg";
import FintechIcon03 from "../../images/company-icon-03.svg";
import FintechIcon04 from "../../images/company-icon-04.svg";
import { useNavigate } from "react-router-dom";
import { Modal } from "@material-ui/core";
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
import { useState } from "react";
function FintechIntro({ open }) {
  const navigate = useNavigate();
  const storage = getStorage();
  const [name, setName] = useState("");
  const [openn ,setOpenn] = useState(false)
  const [price, setPrice] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [expirydate, setExpirydate] = useState("");
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState([]);
  const [close, setClose] = useState(false);
  console.log(name);
  const [cvc, setCvc] = useState("");
  const handleClose = () => {
    setClose(!close);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addUsers = async () => {
      const contactRef = doc(collection(db, "CreditCards"));

      await setDoc(contactRef, {
        cardnumber: cardnumber,
        name: name,
        price: price,
        expirydate: expirydate,
        image: image,
      });
    };
    addUsers();
    window.history.back()

    setName("");
    setPrice("");
    setCardnumber("");
    setExpirydate("");
    setImage("");
  };
  useEffect(() => {
    const q = query(collection(db, "CreditCards"));
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
      const docRef = doc(db, "CreditCards");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getUsers();
  }, []);
  const handleImageUpload = (e) => {
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
    <>
      <Modal open={open} >
        <>
          <div class="min-h-screen flex justify-center items-center bg-transparent">
            <div class="p-10 border-[1px] -mt-10 border-slate-200 rounded-md flex flex-col bg-white items-center space-y-3">
		<ArrowBackIosIcon style={{cursor:"pointer"}} onClick={() => window.history.back()} />
              <input
                class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <div class="flex flex-col space-y-1">
                <input
                  class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                  placeholder="Price"
                  type="file"
                  onChange={handleImageUpload}
                />
              </div>
              <div class="flex flex-col space-y-1">
                <input
                  class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                  placeholder="Price"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div class="flex flex-col space-y-1">
                <input
                  class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                  placeholder="Card Number"
                  type="number"
                  onChange={(e) => setCardnumber(e.target.value)}
                />
              </div>
              <div class="flex flex-col space-y-1">
                <input
                  class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                  placeholder="Expiry Date"
                  type="string"
                  onChange={(e) => setExpirydate(e.target.value)}
                />
              </div>
              <div class="flex flex-col space-y-1">
                <input
                  class="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                  placeholder="CVC"
                  type="number"
                  onChange={(e) => setCvc(e.target.value)}
                />
              </div>
              <div class="flex flex-col space-y-5 w-full">
                <button
                  onClick={handleSubmit}
                  class="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200"
                >
                  Add Credit Card
                </button>
              </div>
            </div>
          </div>
        </>
      </Modal>
      {posts.map((item, index) => (
        <div className="flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
          <div className="px-4 py-5 ">
            <div className="md:flex md:justify-between md:items-center ">
              <div className="flex items-center mb-4 md:mb-0 ">
                <div className="mr-4">
                  <img
                    className="inline-flex rounded-full"
                    src={item.data.image}
                    width="64"
                    height="64"
                    alt="User"
                  />
                </div>

                <div>
                  <div className="mb-2">
                    Hey{" "}
                    <strong className="font-medium text-slate-800">
                      {item.data.name}
                    </strong>{" "}
                    👋, this is your current balance:
                  </div>
                  <div className="text-3xl font-bold text-emerald-500">
                    {item.data.price}
                  </div>
                </div>
              </div>

              <ul className="shrink-0 flex flex-wrap justify-end md:justify-start -space-x-3 -ml-px">
                <li>
                  <a className="block" href="#0">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={FintechIcon01}
                      width="36"
                      height="36"
                      alt="Account 01"
                    />
                  </a>
                </li>
                <li>
                  <a className="block" href="#0">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={FintechIcon02}
                      width="36"
                      height="36"
                      alt="Account 02"
                    />
                  </a>
                </li>
                <li>
                  <a className="block" href="#0">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={FintechIcon03}
                      width="36"
                      height="36"
                      alt="Account 03"
                    />
                  </a>
                </li>
                <li>
                  <a className="block" href="#0">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={FintechIcon04}
                      width="36"
                      height="36"
                      alt="Account 04"
                    />
                  </a>
                </li>
                <li>
                  <button className="flex justify-center items-center w-9 h-9 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-indigo-500 shadow-sm transition duration-150">
                    <span className="sr-only">Add new user</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FintechIntro;
