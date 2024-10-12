import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password,setPassword]=useState("")
  const passwordRef=useRef(null)//useref ko use karte hai jab humko kahi se refrence lena padta hai like yaha button aur input feild alag div mei hao to uska refrence lenge tab jaake copy pe click karne ke baad selection wala bluecolor show hoga
  const passwordGenerator=useCallback(()=>{//use callback used when any function which call many times which rerender the page then callback help to optimise this things by storing the same thing in cache
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed){
    str+="0123456789"
  }
  if(charAllowed){
    str += "!@#$%^&*()_+-={}[]|:\"\'<>,.?`"
  }
  for(let i=1;i<=length;i++){
     let char=Math.floor(Math.random()*str.length+1)
     pass+=str.charAt(char)  
  }
  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])//yeh dependencies ka matlab ka ki insab mei kuchh bhi change hua to cache mei rakho means like memoization for overlapping subproblems in dp
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])//yeh depedencies hai inme se agar kuccchh bhi change hua phir se rerun hota hai like agar setpassword ko humlog agar password kkarde to infinte loop ho jayega kyuki has baar alag alag passwords generate honge
const copyPasswordToClipboard=useCallback(()=>{//window wali chij hume react me isliye milti hai kyuki cline side rendering hoti hai but nextjs me nahi milti kyuki server side rendering hoti h
  passwordRef.current?.select()//user ko batane ke liye kitna select hora h
  passwordRef.current?.setSelectionRange(0,99);//isme batado kitna select karna h abhi hum log poora copy karre hai
window.navigator.clipboard.writeText(password)
},[password])//isme password akela isliye liya kyuki yeh har baar chnge nahi hoga 
  return (
    <>
    <h1 className='text-4xl text-bold text-center'>Password Generator</h1>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-slate-100'>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} ref={passwordRef} className='outline-none w-full py-1 px-3' placeholder='password' readOnly/>
        <button className='bg-black ' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
          <label htmlFor="">Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{setnumberAllowed((prev)=>!prev)}} />
          <label htmlFor="">Numbers</label>
          <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={()=>{setcharAllowed((prev)=>!prev)}}/>
          <label htmlFor="">Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
