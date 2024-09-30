import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../routes/firebase';

// 게시물과 댓글을 함께 가져오는 함수
export const getPostWithComments = async (tweetDocId) => {
  const tweetDoc = await getDoc(doc(db, 'tweets',tweetDocId));
  const commentsQuery = query(collection(db, "comments"), where("tweetDocId", "==", tweetDocId));
  const commentsSnapshot = await getDocs(commentsQuery);
  
  const comments = commentsSnapshot.docs.map(doc => {
    const { createdAt, photo, tweet, userId, userName, profileImg,like} = doc.data();

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
  return { tweet: tweetDoc.data(), comments };
}; 

// 댓글과 대댓글을 가져오는 함수
export const getCommentWithReplies = async (commentId:string) => {
  const commentDoc = await getDoc(doc(db, "comments", commentId));
  const repliesQuery = query(collection(db, "comments"), where("parentCommentId", "==", commentId));
  const repliesSnapshot = await getDocs(repliesQuery);
  
  const replies = repliesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return { comment: commentDoc.data(), replies };
};