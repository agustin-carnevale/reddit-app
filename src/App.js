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
`
const ListContainer = styled.div`
  overflow:auto;
  flex-basis: 35%;
  height: 100vh; 
  overflow: auto;
`

const DetailViewContainer = styled.div`
  display:flex;
  flex-direction:column;
  width: 65%;
  flex-basis: 65%;
 
`

const App = ({entries, fetchEntries, dismissPost}) => {
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(()=>{
    fetchEntries()
  },[])

  const handleSelectPost = (data)=>{
    setSelectedPost(data)
  }

  const handleDismissPost = (id)=>{
    dismissPost(id)
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