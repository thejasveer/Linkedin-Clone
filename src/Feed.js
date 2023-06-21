import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import "./Feed.css";
import FlipMove from "react-flip-move";
import InputOption from "./InputOption";
import Post from "./Post";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function Feed() {
  const ordersRef = collection(db, "posts");
  
  const qDesc = query(ordersRef, orderBy("timestamp", "desc"));
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    const querySnapshot = await getDocs(qDesc);
    if (querySnapshot.docs.length > 0) {
      const hh = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setPosts(hh);
    }
  };

  useEffect(() => {
    getData();

    onSnapshot(
      qDesc,
      (snapshot) => {
        const hh = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPosts(hh);
      },
      (error) => {
        // ...
      }
    );
  }, []);

  const user = useSelector(selectUser);
  const sendPost = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoURL || "",
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
          return (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
              photoUrl={photoUrl}
            />
          );
        })}
      </FlipMove>
    </div>
  );
}

export default Feed;
