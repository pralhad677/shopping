interface data{
  id:number,
  name:string,
  path:string
}
interface Image {
  id: number,
  data:data[],
  
}
interface Image1 {
  image:Image
}

export let NepaliDressList: Image1[] = [
  {
    image: {
      id: 1,
      data: [{
        id:1,
        name: 'विवाह',
        path: "../../../public/Nepali/bihedrees.jpg"
      },
        {
        id:2,
          name: "चोलो ",
          path: "../../../public/Nepali/cholo.jpg"
        }
      ]
    }
  },
  
  {
    image: {
      id: 2,
      data: [{
       id:3,
      name: "ढाका",
      path: "../../../public/Nepali/dhaka.jpg" 
      },
      {
        id:4,
        name: 'जुवारी कोट ',
        path: "../../../public/Nepali/jwari.jpg"
        }
      ]
    },
  },
  {
    image: {
      id: 3,
      data: [{
       id:5,
      name: "शेर्पा",
      path: "../../../public/Nepali/sherpa.jpg" 
      },
      {
        id:6,
        name: 'चोधरी',
        path: "../../../public/Nepali/ch.jpg"
        }
      ]
    },
  },
  {
    image: {
      id: 4,
      data: [{
       id:7,
      name: "नेवार",
      path: "../../../public/Nepali/newari.jpg" 
      },
      {
        id:8,
        name: 'तामाङ',
        path: "../../../public/Nepali/tamang.jpg"
        }
      ]
    },
  }
]