import React, { useState } from 'react';
import styled from 'styled-components'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExternalLinkSquareAlt, faBell } from '@fortawesome/free-solid-svg-icons'

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
    position: relative;
`
const Bell = styled.div`
    position: absolute;
    top:10px;
    left:10px;
`

const Close = styled.div`
    position: absolute;
    top:10px;
    right:10px;
    cursor: pointer;
`

const Top = styled.div`
    margin-top: 5px;
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
`
const Bottom = styled.div`
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const Image = styled.img`
    width: 50%;
    max-width: 150px;
    cursor: pointer;
`

const isImg = (thumbnailUrl)=>{
    return thumbnailUrl && (thumbnailUrl.includes('.jpg') || thumbnailUrl.includes('.jpeg') || thumbnailUrl.includes('.png'))
}

const EntryView = ({data, onClick, onClose}) => {
 const [read,setRead]= useState(false)

 const handleRead = ()=>{
    setRead(true)
    onClick()
 }

 return (
    <Container>
        <Bell>{!read && <FontAwesomeIcon icon={faBell} color='red'/>}</Bell>
        <Close><FontAwesomeIcon icon={faTimes} onClick={onClose}/></Close>
        <Top>
            <h4>{data.author}</h4>
            <p>{timeAgo.format(new Date(data.created_utc*1000))}</p>
        </Top>

        <p>{data.title}</p>

        {isImg(data.thumbnail) && <Image src={data.thumbnail} onClick={handleRead}/>}

        <Bottom>
            <p>{data.num_comments} comments</p>
            <FontAwesomeIcon icon={faExternalLinkSquareAlt} size='2x' onClick={handleRead} style={{cursor:'pointer'}}/>
        </Bottom> 
    </Container>
 )
}

export default EntryView