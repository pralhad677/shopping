import React from 'react'
import './search.scss'
// import RX from 'rxjs'
import { fromEvent,interval, timer } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import B from './b'
// import SearchSvg from './SVG/search'
import CartSvg from './SVG/Carts'

// import Button from '@material-ui/core/Button';
// import Cart from '../AddToCart/b'




type listType<T = any, R = any> = {
  name: T,
  id:R
}
interface Props { 
list:Array<listType<string,number>>
}
  let Index: React.FC<Props> = ({list}) => {
  
    let [value, setValue] = React.useState<string>('')
    let [found, setFound] = React.useState<boolean>(false)
    let [inputLength, setInputLength] = React.useState<number>(0)
    let ref = React.createRef()
    
 


    
    let changeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
      // const source$ = fromEvent<InputEvent>(e.target, 'input')
      
      // const example = source$.pipe(
      //   map((event: InputEvent) => (event.target as HTMLInputElement).value),
      //   // debounce(1000=>1000)
      
      // );
      // example.subscribe(val =>
      //   console.log('val',val)
     
      // );
     

      // console.log(e.target)
      setValue(e.target.value)
      let item1 = list.find(item => item.name === e.target.value)
      console.log('item1', item1)
      setInputLength(e.target.value.length)
      if (item1 !== undefined) {
        setFound(true)
      }
      else {
        setFound(false)
      }
    
    }
    console.log(' found',found)
  return (
    <div id="Div">
      <h1>SearchBox</h1>
      <div style={{ gridColumn: "3/4" }}>
        <div style={{height:"56px",backgroundColor:"rgb(235, 232, 214)"}}>
          
          
          
          <label>
            
          <input placeholder="search for products,brands and more" type="text" value={value} onChange={e => (changeListener(e))} />
          </label>
          {/* <Cart ref={ ref}/> */}
        </div>
      </div>
      
        
      {/* <button>search</button> */}
      <B found={found} length={inputLength} data={ value}/>
      
    </div>
  )
}

export default Index
