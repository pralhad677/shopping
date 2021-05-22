
 
 export interface Image {
   id: string,
   name:string,
  path:string
}

type ImageList1 =Image[]

export const ImageList: ImageList1 = [
  {
    "id": "1",
    name:"Bag",
  "path":"../../../public/Deals/bag.jpg"
  },
  {
    "id": "2",
    name:'Nike Shoes',
  "path":"../../../public/Deals/Nike.jpg"
  },
  { 
    "id": "3",
    name:"Joggers",
  "path":"../../../public/Deals/jockers.jpg"
  },
  {
    "id": "4",
    name:'Pant',
  "path":"../../../public/Deals/pant.jpg"
  },
  {
    "id": "5",
    name:'jacket',
  "path":"../../../public/Deals/jacket.jpg"
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

export function getAllImage():ImageList1 {
    return ImageList
}