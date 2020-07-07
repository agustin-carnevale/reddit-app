import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
`

const Image = styled.img`
    width: 80%;
    max-width: 350px;
`

const isImg = (thumbnailUrl)=>{
    return thumbnailUrl && (thumbnailUrl.includes('.jpg') || thumbnailUrl.includes('.jpeg') || thumbnailUrl.includes('.png'))
}

const PostDetailView = ({data}) => {
 return <Container>
     <h2>{data.author}</h2>
     <h4>{data.title}</h4>
     {isImg(data.thumbnail) && <Image src={data.thumbnail}/>}
 </Container> 
}

export default PostDetailView