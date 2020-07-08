import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
    width: 100%;
`

//just some arbitrary values here, can be 
//done better depending on design needed
const ImgContainer = styled.div`
    width: 400px;
    height: 400px;
`

const Image = styled.img`
    max-height: 100%;
    max-width: 100%;
`

const isImg = (thumbnailUrl)=>{
    //simple check here
    return thumbnailUrl && (thumbnailUrl.includes('.jpg') || thumbnailUrl.includes('.jpeg') || thumbnailUrl.includes('.png'))
}

const renderImage = (data)=>{
    var picture = data?.preview?.images[0]?.source?.url ? data.preview.images[0].source.url : data.thumbnail
    //replacement of &amp; for & because of reddit response legacy encoding
    if(picture) picture = picture.replace(/&amp;/g, "&")
    if (isImg(picture)) return <ImgContainer><Image src={picture}/></ImgContainer>
}

const PostDetailView = ({data}) => {
 return <Container>
    <h2>{data.author}</h2>
    <h4>{data.title}</h4>
    {renderImage(data)}
 </Container> 
}

export default PostDetailView