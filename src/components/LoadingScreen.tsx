import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;

`
const Div = styled.div`
    font-size: 30px;
    color: red;
`
const Logo= styled.img`
    width: 100px;
    height: 100px;
`

export default  function LoadingScreen(){

    return <Wrapper>
                <Div>
                    is Loading...
                </Div> 
        </Wrapper>
}