import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions'
import EntryView from './components/EntryView'
import styled from 'styled-components'
import PostDetailView from './components/PostDetailView'
import Fab from '@material-ui/core/Fab';
import RestoreIcon from '@material-ui/icons/Refresh'

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
`

const DetailViewContainer = styled.div`
  display:flex;
  flex-direction:column;
  width: 65%;
  flex-basis: 65%;
  height: 100vh; 
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
`

const LoadMoreButton = styled.button`
  background: #e8dea9;
  border: 0px;
  color: black;
  font-size: 14px;
  font-weight: bold;
  width: 50%;
  height: 30px;
  border-radius: 30px;
  margin: 20px 25% 20px 25%;
`

const App = ({entries, fetchEntries, dismissPost, dismissAll, after, restore, readPost}) => {
  const [selectedPost, setSelectedPost] = useState(null)
  // const [detailView, setDetailView] = useState(false)

  useEffect(()=>{
    if (!entries || entries.length === 0){
      fetchEntries()
    }
  },[])

  const handleSelectPost = (data)=>{
    setSelectedPost(data)
  }
  const handleDismissPost = (id)=>{
    dismissPost(id)
  }
  const handleDismissAll = (id)=>{
    setSelectedPost(null)
    dismissAll()
  }
  const handleLoadMorePosts = ()=>{
    fetchEntries(after)
  }
  const handleRestoreApp = ()=>{
    restore()
  }

 return (
  <PageContainer>
    <ListContainer>
      {entries && entries.map(post => 
        <EntryView 
          key={post.id} 
          data={post} 
          onClick={()=>handleSelectPost(post)}
          onClose={()=>handleDismissPost(post.id)}
          onRead={readPost}
      />)}
      {after && <LoadMoreButton onClick={handleLoadMorePosts}>Load more..</LoadMoreButton>}
      {entries.length >0 && <DismissAllButton onClick={handleDismissAll}>Dismiss All</DismissAllButton>}
    </ListContainer>
    <DetailViewContainer>
      {selectedPost && <PostDetailView data={selectedPost} />}
    </DetailViewContainer>
    <Fab color="primary" aria-label="add" style={{position:'fixed', bottom: '20px', right: '20px'}} onClick={handleRestoreApp}>
        <RestoreIcon />
    </Fab>
    
  </PageContainer>)
}

const mapState = ({entries})=>({
 entries: entries.list,
 after: entries.after,
})

export default connect(mapState, actions)(App)