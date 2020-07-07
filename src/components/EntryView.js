import React from 'react';
import styled from 'styled-components'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 20px;
    border:1px solid grey;
    background: #283178;
    color: white;
`

const Top = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Image = styled.img`
    width: 50%;
    max-width: 150px;
`

const isImg = (thumbnailUrl)=>{
    return thumbnailUrl && (thumbnailUrl.includes('.jpg') || thumbnailUrl.includes('.jpeg') || thumbnailUrl.includes('.png'))
}

const EntryView = ({data, onClick}) => {
 const date = new Date(data.created_utc*1000) // The 0 there is the key, which sets the date to the epoch
 return (
    <Container onClick={onClick}>
        <Top>
            <h4>{data.author}</h4>
            <p>{timeAgo.format(date)}</p>
        </Top>
        <p>{data.title}</p>
        {isImg(data.thumbnail) && <Image src={data.thumbnail}/>}
        <p>Number of comments: {data.num_comments}</p>
    </Container>
 )
}

export default EntryView