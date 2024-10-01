import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { ITweets } from "../components/timeline";
import { Unsubscribe } from "firebase/auth";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import styled from "styled-components";
import Tweet from "../components/tweet";
import TweetComment from "../components/tweetComment";


const Wrapper =styled.div`  
    width: 100%;
    height: 100vh;
`

const Tweets= styled.div`
margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;
`


export default function Bookmark(){

    const user= auth.currentUser;
    console.log(user);
    
    const [tweet,setTweet]= useState<ITweets[]>([]);
    const [retweet,setRetweet]= useState<ITweets[]>([]);


    
    useEffect(()=>{
        let unsubscribe : Unsubscribe | null  = null;
        let unsubscribe2 : Unsubscribe | null  = null;


        async function fetchTweets() {
            //  쿼리해서 데이터를 가져올때 filtering 해야할 경우 firestore에게 index를 만들라고 요청해야함
            const tweetQuery =query(collection(db,'tweets'),where('bookmark',"array-contains",user?.uid), orderBy('createdAt',"desc"),limit(25));
            
            // const snapshot = await  getDocs(tweetQuery);
            unsubscribe = await onSnapshot(tweetQuery,snapshot=>{
                const tweets= snapshot.docs.map(doc=>{
                  
                    const {createdAt,photo, tweet,userId,userName,like,profileImg,bookmark} = doc.data();
              
                    return {
                        createdAt,
                        photo,
                        tweet,
                        userId,
                        userName,
                        docId: doc.id,
                        profileImg,
                        like,
                        bookmark,
                    }
                })
                setTweet(tweets);
            })
            const retweetQuery =query(collection(db,'comments'),where('bookmark',"array-contains",user?.uid), orderBy('createdAt',"desc"),limit(25));
            
            // const snapshot = await  getDocs(tweetQuery);
            unsubscribe2 = await onSnapshot(retweetQuery,snapshot=>{
                const retweets= snapshot.docs.map(doc=>{
                  
                    const {createdAt,photo, tweet,userId,userName,like,profileImg,bookmark} = doc.data();
              
                    return {
                        createdAt,
                        photo,
                        tweet,
                        userId,
                        userName,
                        docId: doc.id,
                        profileImg,
                        like,
                        bookmark,
                    }
                })
                setRetweet(retweets);
            })
        }
        
        fetchTweets();
        return ()=>{
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            unsubscribe && unsubscribe();
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            unsubscribe2 && unsubscribe2();

        }
    },[]);

    return <Wrapper>
            <h2>Bookmark</h2>
            <Tweets>
                {tweet.map(item=><Tweet key={item.docId} {...item}></Tweet>)}
            </Tweets>
            <Tweets>
                {retweet.map(item=><TweetComment key={item.docId} {...item}></TweetComment>)}
            </Tweets>      
         </Wrapper>
   
}