

import { useEffect, useState } from "react"
import styled from "styled-components"
import  { ITweets } from "../components/timeline";
import { collection, limit, onSnapshot, orderBy, query, Unsubscribe,  where } from "firebase/firestore";
import {  db} from "../routes/firebase";
import { useParams } from "react-router-dom";
import TweetComment from "./tweetComment";
import PostRetweetCommentForm from "./post-retweet-comment-form";
import RetweetComment from "./retweetComment";

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
    
  
    const { retweetDocId } = useParams(); // 누른 댓글의 docId
    
  const [retweet,setTweet] =useState<ITweets[]>([]);
  const [comment,setComment] =useState<ITweets[]>([]);
 
  
  useEffect(()=>{
      let unsubscribe : Unsubscribe | null = null;
      let unsubscribe2 : Unsubscribe | null = null;

    
          async function fetchTweets(){
              const retweetsQuery =query(collection(db ,'comments'), orderBy('createdAt',"desc"),limit(25));
              const commentsQuery =query(collection(db ,'comments'), orderBy('createdAt',"desc"),limit(25), where('parentCommentId', '==', retweetDocId));

      
          unsubscribe= await onSnapshot(retweetsQuery, (snapshot) => {
              const retweets = snapshot.docs.map(doc => {
                  const { createdAt, photo, tweet, userId, userName, profileImg,like,tweetDocId,parentCommentId,bookmark} = doc.data();
               
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
              setTweet(retweets);
           
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
      
  },[retweetDocId]); 

  
  return <Wrapper>
      {retweet.filter(retweet=>retweet.docId===retweetDocId).map(retweet=><TweetComment key={retweet.docId} {...retweet}></TweetComment>)}
      <Reply>
        <span>댓글 {comment.length}</span>
      </Reply>
      <PostRetweetCommentForm docId={retweetDocId} ></PostRetweetCommentForm>
      {comment.map(comment=><RetweetComment key={comment.docId} {...comment}></RetweetComment>)}
      </Wrapper>
     
}