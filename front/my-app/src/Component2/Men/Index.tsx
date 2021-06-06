import React from 'react'
import Slider from "react-slick";
import './index.module.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Button} from '@material-ui/core'
import { Context } from '../../App'
import {gql,useMutation} from '@apollo/client'
 
interface Props{
  
}
 
const Get_User = gql`
mutation getUser($id:ID!){
  getUser(id:$id){
    _id
  }
}
`

let Index: React.FC<Props> = (props) => {
  const [GetUser] = useMutation(Get_User, {
    onCompleted: data => console.log(data)
  }
  )
  const {state,dispatch}= React.useContext(Context)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500, 
    slidesToShow: 4, 
    slidesToScroll: 4
  };
  console.log('state', state)
  let myfn = async () => {
    console.log('localStorage',typeof localStorage.getItem('id'))
    const variables = {id:localStorage.getItem('id')}
    let graphResponse = await GetUser({ variables })
    console.log('graphResponse',graphResponse.data.getUser._id)
    if ("60b1f9951d2b5807e81b8ff4" === graphResponse.data.getUser._id) {
      dispatch({ type: 'success', data: { data: [{ email: 'bckjas', password: 'nlkacs', auth: true }] } })
    }
  }
  return (
    
    <div>
      <div>
        <h1>Biggest Top Brands</h1>
      <Slider {...settings}>
        <div >
          <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/af31285e-f6a3-426e-bbea-0aedef9da17c1598892377537-Tommy-Hilfiger.jpg" />
        </div>
        <div>
        
        <div></div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/retaillabs/2020/9/23/365320d5-745e-4cbf-bb64-7ef1d8c9c5611600854269662-gap-men.jpg"/> 
        </div>
        <div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/3fa337a0-c792-4038-8d12-50d463c189a11598892377363-Levis.jpg"/> 
        </div>
        <div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/1dce9c3e-77fa-48f1-85a3-d3c136c1d73e1598892377652-USPA.jpg" />
        </div>
        <div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/cec595c6-c7ec-4259-af8b-997a33a09ce71598892377444-Puma.jpg" />
        </div>
        <div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/a7d3676a-9694-4a84-835e-0408fdad884b1598892377407-Nike.jpg" />
        </div>
        <div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/0206da63-a7cc-4f83-8527-90d7dc74706b1598892377489-Skechers.jpg" />
        </div>
        <div>
        <img alt="pic" src="https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2020/8/31/7c28bc7a-0184-44b2-8666-ea1438d595561598892377316-J_J.jpg" />
        </div>
            
       
        </Slider>
      </div>
      <h1>Summer</h1>
      <div style={{ display: "flex" }}>
       
        <div style={{margin:"25px"}}>
          <img alt="pic" src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/89f1bd9d-3a28-456d-888a-beff717a06f81594222908155-Shirts.jpg" />
        </div>
        <div style={{margin:"25px"}}>
          <img alt="pic" src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/ae14f627-9fd9-41ce-80a4-f107c316c7eb1594222907625-Casual-shoes.jpg" />
          </div>
        <div style={{margin:"25px"}}>
        <img alt="pic" src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/2bac5e2d-337b-42c0-88c7-3d4e2dc464141594222908262-Shorts-_-Trousers.jpg" />
        <h1>add to card</h1>
        </div>
        <div style={{ margin: "25px" }} > 
          <Button onClick={myfn}>
            <img alt="pic" src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/720cf6ef-3be4-4825-8211-0125c942e3821594222907960-Jeans.jpg" />
         
        </Button>
           
        </div>
        
        {/* <img alt="pic" src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/9ff1f34e-9242-47fd-9566-e7d7a5c240511594222908483-T-shirt.jpg" />
        <img alt="pic" src="https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2020/7/8/f0f9b81a-b9d5-4b8b-94d5-ea878fa9b18e1594222834121-Infant-Essential.jpg" /> */}
      </div>
    </div> 
  ) 
} 

export default Index
