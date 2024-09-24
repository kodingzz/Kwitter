
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from './firebase';

const Wrapper= styled.div`
   
`


export default function Home(){
    const navigate= useNavigate();

    async function handleLogout(){
        //  로그아웃 
        const ok = confirm('Are you sure you want to logout?');
        if(ok){
            await auth.signOut();
            navigate('/begin');
        }
    }
   return <Wrapper>
        <span>Home</span>
       <button onClick={handleLogout}>로그아웃</button>

    </Wrapper>
  
}
