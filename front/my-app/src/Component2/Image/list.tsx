
 
 interface Image {
  id:string,
  path:string
}

type ImageList1 =Image[]

export const ImageList: ImageList1 = [
  {
    "id":"1",
  "path":"../../../public/List/1.jpg"
  },
  {
    "id":"2",
  "path":"../../../public/List/2.jpg"
  },
  { 
    "id":"3",
  "path":"../../../public/List/3.jpg"
  },
  {
    "id":"4",
  "path":"../../../public/List/4.jpg"
  },
]
interface SingleImage<T,U>{
  (id:T):U|undefined
}
let itemIdList = [1,2,3,4]

export let getSingleImage: SingleImage<string, Image> = (id: string)  => {
  if (!itemIdList.includes(Number(id))) {
    return ImageList.find(item => item.id === '1')
  }
  else {
    return ImageList.find(item => item.id === id)
  }
}