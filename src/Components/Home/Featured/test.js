import React, { useState } from 'react';
import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';

const Test = () => {

    const [show, setShow] = useState(true);
    const [bck,setBck] = useState('#ffffff');


    return ( 

    
    <>

<button 
onClick={()=>{setBck('#ffff00')}}>
    Update
</button>

<button 
onClick={()=>{setShow(false)}}>
    Remove
</button>

<button 
onClick={()=>{setShow(true)}}>
    Show
</button>






        <Animate
        show={show}
        start={{
            backgroundColor:bck,
            width:500,
            height:500,
            opacity:0,

        }}
        enter={{
            backgroundColor:bck,
            width:[100],
            height:[100],
            opacity:[1],
            timing:{
                duration:1000,
                delay:500,
                ease:easePolyOut,
            }
        }}

        update={{
            backgroundColor:bck,
            opacity:[0.5],
            timing:{
                duration:2000,
                delay:500,
                ease:easePolyOut,
            },
            events:{
                start:()=>{
console.log('started');
                },
                end:()=>{
                    console.log('ended ');
                }
            }

        }}

        leave={[
            {backgroundColor:'#6a0dad',
                width:[1000],
                height:[500],
                timing:{
                    duration:500,
                    ease:easePolyOut,
                }
    
            },
            {
                opacity:[0],
                timing:{
                    duration:3000,
                    delay:500,
                    ease:easePolyOut,
                }
    
            }
        ]}

        
        
        
        >
                { ({backgroundColor,width,height,opacity}) =>(
<div style={{
    backgroundColor,width,height,opacity
}}>
    Hello
</div>
                )}
        </Animate>
       
    </>
    
    );
}
 
export default Test;