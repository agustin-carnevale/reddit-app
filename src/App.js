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
  display:flex;
  flex-direction:column;
  width: 35%;
  overflow-y:scroll;
`

const DetailViewContainer = styled.div`
  display:flex;
  flex-direction:column;
  width: 65%;
`

const App = ({entries, fetchEntries}) => {
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(()=>{
    fetchEntries()
  },[])

  const handleSelectPost = (data)=>{
    setSelectedPost(data)
  }

 return (
  <PageContainer>
    <ListContainer>
        {entries && entries.map(item => <EntryView key={item.data.id} data={item.data} onClick={()=>handleSelectPost(item.data)}/>)}
    </ListContainer>
    <DetailViewContainer>
      {selectedPost && <PostDetailView data={selectedPost} />}
    </DetailViewContainer>
  </PageContainer>)
}

const mapState = ({entries})=>({
 entries
})

export default connect(mapState, actions)(App)