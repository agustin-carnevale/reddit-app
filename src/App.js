import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions'
import EntryView from './components/EntryView'
import styled from 'styled-components'
import PostDetailView from './components/PostDetailView'

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


const App = ({entries, fetchEntries, dismissPost, dismissAll, after}) => {
  const [selectedPost, setSelectedPost] = useState(null)
  // const [detailView, setDetailView] = useState(false)

  useEffect(()=>{
    fetchEntries()
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

 return (
  <PageContainer>
    <ListContainer>
      {entries && entries.map(item => 
        <EntryView 
          key={item.data.id} 
          data={item.data} 
          onClick={()=>handleSelectPost(item.data)}
          onClose={()=>handleDismissPost(item.data.id)}
      />)}
      {entries.length >0 && <DismissAllButton onClick={handleDismissAll}>Dismiss All</DismissAllButton>}
    </ListContainer>
    <DetailViewContainer>
      {selectedPost && <PostDetailView data={selectedPost} />}
    </DetailViewContainer>
  </PageContainer>)
}

const mapState = ({entries})=>({
 entries: entries.list,
 after: entries.after,
})

export default connect(mapState, actions)(App)