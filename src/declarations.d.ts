declare module 'resize-image' {
  declare function resize(
    img: Image,
    width: number,
    height: number,
    type: 'png',
  ): Blob
  declare const PNG: 'png'
}
