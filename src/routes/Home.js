import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fBase";
import { onSnapshot } from "firebase/firestore";
import Tweet from "component/Tweet";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  // const getTweets = async () => {
  //   const dbtweets = await getDocs(collection(dbService, "tweets"));
  //   dbtweets.forEach((document) => {
  //     const tweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setTweets((prev) => [tweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getTweets();
    onSnapshot(collection(dbService, "tweets"), (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "tweets"), {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        ></input>
        <input type="submit" value="tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid} // 오마가쉬,,,,,!! boolean값을 넘긴다.
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
