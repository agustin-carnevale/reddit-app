import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions'
import EntryView from './components/EntryView'
import styled from 'styled-components'
import PostDetailView from './components/PostDetailView'
import Fab from '@material-ui/core/Fab';
import RestoreIcon from '@material-ui/icons/Refresh'
import {useTransition, animated} from 'react-spring'

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
  // const [detailView, setDetailView] = useState(false)

  const transitions = useTransition(entries ? entries : [], post=>post.id, {
    from: { opacity:0,  marginTop: -100, marginBottom:100 },
    enter: { opacity:1, marginTop: 0, marginBottom:0 },
    leave: { opacity:0, marginLeft: -400, marginRight: 400 },
    config:{duration: 300},
    delay:{duration: 400}
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

 return (
  <PageContainer>

    <ListContainer>
    {entries && transitions.map(({ item, props, key }) =>
      <animated.div key={key} style={props}> 
        <EntryView 
          data={item} 
          onClick={()=>setSelectedPost(item)}
          onClose={()=>dismissPost(item.id)}
          onRead={readPost}
        />
      </animated.div>)}
      {after && <LoadMoreButton onClick={()=>fetchEntries(after)}>Load more..</LoadMoreButton>}
      {entries.length >0 && <DismissAllButton onClick={handleDismissAll}>Dismiss All</DismissAllButton>}
    </ListContainer>

    <DetailViewContainer>
      {selectedPost && <PostDetailView data={selectedPost} />}
    </DetailViewContainer>
    
    <Fab color="primary" onClick={restore}
      style={{position:'fixed', bottom: '20px', right: '20px'}} 
    >
      <RestoreIcon />
    </Fab>

  </PageContainer>)
}

const mapState = ({entries})=>({
 entries: entries.list,
 after: entries.after,
})

export default connect(mapState, actions)(App)