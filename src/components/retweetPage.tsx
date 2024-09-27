

import { useEffect, useState } from "react"
import styled from "styled-components"
import  { ITweets } from "../components/timeline";
import { collection, limit, onSnapshot, orderBy, query, Unsubscribe, updateDoc, where } from "firebase/firestore";
import Tweet from "../components/tweet";
import { auth, db, storage } from "../routes/firebase";
import { useParams } from "react-router-dom";
import PostRetweetForm from "./post-retweet-form";
import Retweet from "./retweet";


const Wrapper =styled.div`  
display: flex;
flex-direction: column;
align-items:center;
gap: 20px;
`
const Reply = styled.div`

    margin-right: auto;
    padding : 10px 0;
    span{
        font-size: 20px;
    }
`


export default function RetweetPage(){ 

    const { tweetDocId } = useParams(); // URL에서 파라미터 추출
    
  const [tweet,setTweet] =useState<ITweets[]>([]);
  const [retweet,setRetweet] =useState<ITweets[]>([]);

  
  useEffect(()=>{
      let unsubscribe : Unsubscribe | null = null;
      let unsubscribe2 : Unsubscribe | null = null;

    
          async function fetchTweets(){
              const tweetsQuery =query(collection(db ,'tweets'), orderBy('createdAt',"desc"),limit(25));
              const retweetsQuery =query(collection(db ,'tweets',`${tweetDocId}`,'retweets'), orderBy('createdAt',"desc"),limit(25));

      
          unsubscribe= await onSnapshot(tweetsQuery, (snapshot) => {
              const tweets = snapshot.docs.map(doc => {
                  const { createdAt, photo, tweet, userId, userName, profileImg,like } = doc.data();
               
                  return {
                      docId: doc.id,
                      createdAt,
                      photo,
                      tweet,
                      userId,
                      userName,
                      profileImg,
                      like,
                  };
                  
              });
              setTweet(tweets);
           
          });


          unsubscribe2= await onSnapshot(retweetsQuery, (snapshot) => {
            const retweets = snapshot.docs.map(doc => {
                const { createdAt, photo, tweet, userId, userName, profileImg,like } = doc.data();
             
                return {
                    docId: doc.id,
                    createdAt,
                    photo,
                    tweet,
                    userId,
                    userName,
                    profileImg,
                    like,
                };
                
            });
            setRetweet(retweets);
         
        });
          }
          fetchTweets();
              return () => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              unsubscribe && unsubscribe();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              unsubscribe2 && unsubscribe2();

          };
      
  },[]); 

  
  return <Wrapper>
      {tweet.filter(tweet=>tweet.docId===tweetDocId).map(tweet=><Tweet key={tweet.docId} {...tweet}></Tweet>)}
      <Reply>
        <span>댓글 {retweet.length}</span>
      </Reply>
      <PostRetweetForm docId={tweetDocId} status='Reply'></PostRetweetForm>
      {retweet.map(retweet=><Retweet tweetDocId={tweetDocId} key={retweet.docId} {...retweet}></Retweet>)}
      </Wrapper>
     
}