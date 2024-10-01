

import { useEffect, useState } from "react"
import styled from "styled-components"
import  { ITweets } from "../components/timeline";
import { collection, limit, onSnapshot, orderBy, query, Unsubscribe, updateDoc, where } from "firebase/firestore";
import Tweet from "../components/tweet";
import { auth, db, storage } from "../routes/firebase";
import { useParams } from "react-router-dom";
import PostRetweetForm from "./post-retweet-form";
import Retweet from "./tweetComment";
import { getPostWithComments } from "./firebaseService";
import TweetComment from "./tweetComment";

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


export default function TweetPage(){ 
    const user =auth.currentUser;


    const { tweetDocId } = useParams(); // URL에서 파라미터 추출
    
  const [tweet,setTweet] =useState<ITweets[]>([]);
  const [comment,setComment] =useState<ITweets[]>([]);
  
  useEffect(()=>{
      let unsubscribe : Unsubscribe | null = null;
      let unsubscribe2 : Unsubscribe | null = null;

    
          async function fetchTweets(){
              const tweetsQuery =query(collection(db ,'tweets'), orderBy('createdAt',"desc"),limit(25));
              const commentsQuery =query(collection(db ,'comments'), where('tweetDocId', '==', tweetDocId), orderBy('createdAt',"desc"),limit(25));

      
          unsubscribe= await onSnapshot(tweetsQuery, (snapshot) => {
              const tweets = snapshot.docs.map(doc => {
                  const { createdAt, photo, tweet, userId, userName, profileImg,like,tweetDocId,parentCommentId, bookmark } = doc.data();
               
                  return {
                      docId: doc.id,
                      createdAt,
                      photo,
                      tweet,
                      userId,
                      userName,
                      profileImg,
                      like,
                      tweetDocId,
                      parentCommentId,
                      bookmark,
                  };
                  
              });
              setTweet(tweets);
           
          });


          unsubscribe2= await onSnapshot(commentsQuery, (snapshot) => {
            const comments = snapshot.docs.map(doc => {
                const { createdAt, photo, tweet, userId, userName, profileImg,like,tweetDocId,parentCommentId,bookmark } = doc.data();
             
                return {
                    docId: doc.id,
                    createdAt,
                    photo,
                    tweet,
                    userId,
                    userName,
                    profileImg,
                    like,
                    tweetDocId,
                    parentCommentId,
                    bookmark,
                };
                
            });
            setComment(comments);
         
        });
          }
          fetchTweets();
              return () => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              unsubscribe && unsubscribe();
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              unsubscribe2 && unsubscribe2();

          };
      
  },[tweetDocId]); 



  return <Wrapper>
      {tweet.filter(tweet=>tweet.docId===tweetDocId).map(tweet=><Tweet key={tweet.docId} {...tweet}></Tweet>)}
      <Reply>
        <span>댓글 {comment.length}</span>
      </Reply>
      <PostRetweetForm docId={tweetDocId} status='Reply'></PostRetweetForm>
      {comment.map(comment=><TweetComment  key={comment.docId} {...comment}></TweetComment>)}
      </Wrapper>
     
}