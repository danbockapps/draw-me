import React, { useRef, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react'
import uuid from 'uuid'
import { storage } from './firebase'

const App = () => {
  const [origImage, setOrigImage] = useState<string>()
  const [modImage, setModImage] = useState<string>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileChange = (fl: FileList | null) => {
    if (fl !== null) {
      const ref = storage
        .ref()
        .child(uuid.v4() + '.' + fl[0].name.split('.').pop()) // Random string for unique filename

      ref
        .put(fl[0])
        .then(() => ref.getDownloadURL())
        .then(url => setOrigImage(url))
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
        accept='image/*'
        hidden
        onChange={e => fileChange(e.target.files)}
      />

      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
            {origImage && <img src={origImage} alt='Original' />}
          </Grid.Column>
          <Grid.Column>
            {modImage && <img src={modImage} alt='Modified' />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default App
