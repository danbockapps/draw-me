import React, { useRef } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Header, Segment } from 'semantic-ui-react'
import { storage } from './firebase'

import uuid from 'uuid'

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileChange = (fl: FileList | null) => {
    if (fl !== null) {
      storage
        .ref()
        .child(uuid.v4()) // Random string for unique filename
        .put(fl[0])
        .then(data => {
          console.log(data)
        })
        .catch(err => alert('An error occurred: ' + err))
    }
  }

  return (
    <Container style={{ marginTop: '2em' }}>
      <Header as='h1' inverted textAlign='center'>
        Draw Me
      </Header>

      <Segment inverted textAlign='center'>
        <p>Upload a picture. We'll turn it into a cartoon.</p>
      </Segment>

      <Segment inverted textAlign='center'>
        <Button
          inverted
          color='yellow'
          size='massive'
          onClick={() => fileInputRef?.current?.click()}
        >
          Select Image...
        </Button>
      </Segment>

      <input
        ref={fileInputRef}
        type='file'
        hidden
        onChange={e => fileChange(e.target.files)}
      />
    </Container>
  )
}

export default App
