import styled from "styled-components"

export const FileCondition =styled.div`
`

export const Wrapper =styled.div`
   display: grid;
   padding: 20px;
   border: 1px solid rgba(255,255,255,0.5);
   border-radius:5px;
   width: 95%;
`
export const Column =styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    padding: 10px;
`

export const Row =styled.div`
    display: flex;
    width: 100%;
    max-height: 400px;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`
export const UserName =styled.span`
    font-family: 600;
    font-size: 20px;
`
export const UploadedDate =styled.span`
    opacity: 0.5;
`
export const Payload =styled.p`
margin-left: 5px;
`

export const Photo =styled.img`
width: 500px;
height: 300px;
border-radius: 10px;
margin-top: 10px;
`

export const Div = styled.div`
     display: flex;
    justify-content: start;
     align-items: center;
     gap: 10px;
     margin-top: 10px;
`

export const DeleteBtn =styled.button`
    background-color: black;
    border: none;
    color:tomato;
    cursor: pointer;
    width: 35px;

    &:hover{
        opacity: 0.7;
    }
`

export const EditBtn =styled.button`
    background-color: black;
    border: none;
    color:white;
    cursor: pointer;
    width: 35px;

    &:hover{
        opacity: 0.7;
    }
`
export const EditTextArea =styled.textarea`
    background-color: black;
    color: white;
    margin-top: 10px;
    width: 100%;
    resize: none;
    height: 200px;
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
export const EditTextLabel =styled.label`
    cursor: pointer;
`
export const EditTextInput = styled.input`
    
`

export const CancelBtn = styled.button`
cursor: pointer;
background-color: tomato;
border: none;
padding: 10px 20px;
border-radius: 20px;
color: white;
font-weight: 600;

&:hover{
    opacity: 0.7;
}
`
 export const UpdateBtn = styled.button`
    cursor: pointer;
    background-color: #1B90EC;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    color: white;
    font-weight: 600;

    &:hover{
        opacity: 0.7;
    }
`
 export const InputItem =styled.div`
   display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;

    svg{
        width: 25px;
        height: 25px;
        fill: white;
    }
    svg:hover{
        fill: #1B90EC;
    }
`
export const Wrapper2 =styled.div`
    display: flex;
    justify-content: start;
    align-items: self-start;
    gap: 10px;
    margin-top: 20px;
    padding-left: 10px;

`
export const Wrapper3 =styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding-left: 10px;

`

export const DeleteImg = styled.div`
    width: 30px;
    height: 30px;
    color: tomato;
    cursor: pointer;


    &:hover{
        opacity: 0.7;
    }
`   

export const AvatarImg =styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

export const ReplyContainer =styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 10rem;
    height: 30px;
   padding: 10px;
   margin-left: 4px;
`


export const Like =styled.div`
width: 35px;
height: 35px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;

&:hover{
    color: #F91880;
    transition:  0.2s all ease-in-out;
}
`
export const NonLike =styled.div`
width: 35px;
height: 35px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
color : #F91880;

svg{
    fill:#F91880;
}

`

export const Bookmark =styled.div`
width: 35px;
height: 35px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;

svg{
    width: 20px;
    height:20px ;
}

&:hover{
    color: #1D9BF0;
    transition:  0.2s all ease-in-out;
}
`
export const NonBookmark =styled.div`
width: 35px;
height: 35px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
color : #1D9BF0;

svg{
    width: 20px;
    height: 20px;
    fill: #1D9BF0;
}

`

export const Reply =styled.div`
width: 20px;
height: 20px;
cursor: pointer;

&:hover{
    transition: 0.2s color ease-in-out;
   color: #1D9BF0;

}
`

export const Share =styled.div`
width: 20px;
height: 20px;
cursor: pointer;
`