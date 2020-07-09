import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import * as actions from '../store/actions'
import EntryView from './EntryView'
import styled from 'styled-components'
import PostDetailView from './PostDetailView'
import Fab from '@material-ui/core/Fab';
import RestoreIcon from '@material-ui/icons/Refresh'
import {useTransition, animated} from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward} from '@fortawesome/free-solid-svg-icons'
import {MOBILE_SCREEN_BREAKPOINT} from '../config'

const PageContainer = styled.div`
  display:flex;
  flex-direction:row;
  width: 100%;
  height: 100vh; 
`
const ListContainer = styled.div`
  overflow:auto;
  flex-basis: 35%;
  height: 100vh; 
  overflow: auto;
  position:relative;

  @media (max-width: ${MOBILE_SCREEN_BREAKPOINT}px) {
    flex-basis: 100%;
    ${props => props.mobileView ? '': 'display:none;'}
  }
`

const DetailViewContainer = styled.div`
  display:flex;
  flex-direction:column;
  flex-basis: 65%;
  height: 100vh;
  padding-top: 25px; 
  position: relative;

  @media (max-width: ${MOBILE_SCREEN_BREAKPOINT}px) {
    flex-basis: 100%;
    ${props => props.mobileView ? '': 'display:none;'}
  }
`
const DismissAllButton = styled.button`
  background: #131630;
  color: white;
  font-size: 20px;
  position: sticky;
  bottom:0;
  width: 100%;
  height: 35px;
  border-radius: 10px;
  cursor: pointer;
`

const LoadMoreButton = styled.button`
  border: 0px;
  color: black;
  font-size: 14px;
  font-weight: bold;
  width: 50%;
  height: 30px;
  border-radius: 30px;
  margin: 20px 25% 20px 25%;
  cursor: pointer;
`
const BackToPostListButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

  @media (min-width: ${MOBILE_SCREEN_BREAKPOINT+1}px) {
    display: none;
  }
`

const FabStyles = {
  position:'fixed', 
  bottom: '40px', 
  right: '15px'
}

const App = ({
  entries, 
  fetchEntries, 
  dismissPost, 
  dismissAll, 
  after, 
  restore, 
  readPost
}) => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [mobileDetailView, setMobileDetailView] = useState(false)

  const transitions = useTransition(entries ? entries : [], post=>post.id, {
    from: { opacity:0,  marginTop: -100, marginBottom:100 },
    enter: { opacity:1, marginTop: 0, marginBottom:0 },
    leave: { opacity:0, marginLeft: -200, marginRight: 200 },
    config:{duration: 500},
    delay:{duration: 200}
  })

  useEffect(()=>{
    if (!entries || entries.length === 0){
      fetchEntries()
    }
  },[])

  const handleDismissAll = (id)=>{
    setSelectedPost(null)
    dismissAll()
  }

  const onRead = (id, item) =>{
    setSelectedPost(item)
    setMobileDetailView(true)
    readPost(id)
  }
 
 return (
  <PageContainer>
    <ListContainer mobileView={!mobileDetailView}>
    {entries && transitions.map(({ item, props, key }) =>
      <animated.div key={key} style={props}> 
        <EntryView 
          data={item} 
          onRead={(id)=>onRead(id,item)}
          onClose={()=>dismissPost(item.id)}
        />
      </animated.div>)}
      {after && <LoadMoreButton onClick={()=>fetchEntries(after)}>Load more..</LoadMoreButton>}
      {entries.length >0 && <DismissAllButton onClick={handleDismissAll}>Dismiss All</DismissAllButton>}
    </ListContainer>

    <DetailViewContainer mobileView={mobileDetailView}>
      {selectedPost && <PostDetailView data={selectedPost} />}
      <BackToPostListButton>
        <FontAwesomeIcon icon={faBackward} size='lg' onClick={()=>setMobileDetailView(false)}/>
      </BackToPostListButton>
    </DetailViewContainer>

    <Fab color="primary" onClick={restore} style={FabStyles}>
      <RestoreIcon />
    </Fab>
  </PageContainer>)
}

const mapState = ({entries})=>({
 entries: entries.list,
 after: entries.after,
})

export default connect(mapState, actions)(App)