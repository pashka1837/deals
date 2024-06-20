import { useEffect, useState } from "react";

import styles from "./MyForm.module.css"

import ClientCard from "../Cards/ClientCard";
import JobCard from "../Cards/JobCard";
import LocationCard from "../Cards/LocationCard";
import ScheduledCard from "../Cards/ScheduledCard";
import AppExtensionsSDK, { Command } from "@pipedrive/app-extensions-sdk";

// const sdk = new AppExtensionsSDK({ identifier: '27e21e0e-673e-4570-8c4f-4d60b9f8fa27' });
const urlSearchParams = new URLSearchParams(window.location.search);

export default function MyForm() {
const [sdk, setSdk] = useState(null)

  useEffect(()=>{
    const initSdk = async () => {
      const id = urlSearchParams.get('id')||'27e21e0e-673e-4570-8c4f-4d60b9f8fa27'
      const sdk = new AppExtensionsSDK({identifier:id}).initialize();
      setSdk(sdk);
    }
    initSdk();
  },[])

  const [submitted, setSub]=useState(false)
  const [isError, setError]=useState(false)


  async  function handleSubmit(e){
    e.preventDefault();     
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson)
  try {
    const res = await fetch('/deal', {
    method: 'POST', 
    body: JSON.stringify(formJson),
    headers: {
    'Content-Type': 'application/json',
    }
  });

  const data = await res.json();
  console.log(data);
  if(!data.ok) {
    console.log('Server api error');
    setError(true);
    return;
  }
  setSub(true)
  setError(false)
} catch (error) {
  setError(true);
  console.log('Client req error');
}

       
        
}
async function handleClose() {
  await sdk.execute(Command.CLOSE_MODAL);
}
  return (
    <>
    {isError && <h2>Oops,backend error</h2>}
    {submitted
      ? (<h1>have been submitted</h1>)
      :(      
      <form 
      className={styles.myForm}
      onSubmit={handleSubmit}>

        <ClientCard />
        <JobCard />
        <LocationCard />
        <ScheduledCard/>
        {/* <div style={{width:'100%',display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}> */}
          <button type="submit">Submit</button>
          <button onClick={handleClose} type="button">save</button>
        {/* </div> */}
    

    
    </form>
    )
    }
    </>
    
   
  )
}