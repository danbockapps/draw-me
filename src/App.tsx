import React, { useRef, useState } from 'react'
import * as resizeImage from 'resize-image'
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react'
import uuid from 'uuid'
import { dataURItoBlob } from './dataUriToBlob'
import { storage } from './firebase'
import { sendRequest } from './photo'

const MAX_DIMENSION = 400

const newImageDimensions: (img: HTMLImageElement) => [number, number] = ({
  width,
  height,
}) =>
  width > height
    ? [MAX_DIMENSION, (height * MAX_DIMENSION) / width]
    : [(width * MAX_DIMENSION) / height, MAX_DIMENSION]

const App = () => {
  const [origImage, setOrigImage] = useState<string>()
  const [modImage, setModImage] = useState<string>()
  const [loading, setLoading] = useState<boolean>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileChange = (fl: FileList | null) => {
    if (fl !== null) {
      setLoading(true)

      const img = new Image()

      img.onload = function() {
        const [width, height] = newImageDimensions(img)
        const data = resizeImage.resize(img, width, height, resizeImage.PNG)
        const ref = storage
          .ref()
          .child(uuid.v4() + '.' + fl[0].name.split('.').pop()) // Random string for unique filename

        ref
          .put(dataURItoBlob(data))
          .then(() => ref.getDownloadURL())
          .then(url => {
            setOrigImage(url)
            return sendRequest(url)
          })
          .then(resultUrl => resultUrl && setModImage(resultUrl))
          .catch(err => alert('An error occurred: ' + err))
          .finally(() => setLoading(false))
      }

      img.src = URL.createObjectURL(fl[0])
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
          loading={loading}
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

      <Grid style={{ marginTop: '2em' }}>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center'>
            {origImage && <img src={origImage} alt='Original' />}
          </Grid.Column>
          <Grid.Column textAlign='center'>
            {modImage && <img src={modImage} alt='Modified' />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default App
