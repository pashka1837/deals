import { useState } from "react";

import styles from "./MyForm.module.css"

import ClientCard from "../Cards/ClientCard";
import JobCard from "../Cards/JobCard";
import LocationCard from "../Cards/LocationCard";
import ScheduledCard from "../Cards/ScheduledCard";




export default function MyForm() {
  const [submitted, setSub]=useState(false)
  const [isError, setError]=useState(false)
  async  function handleSubmit(e){
        e.preventDefault();
        const new_deal = {
            title: "Deal of the century1",
            value: 10000,
            currency: "USD",
            user_id: null,
            person_id: null,
            org_id: 1,
            stage_id: 1,
            status: "open",
            expected_close_date: "2022-02-11",
            probability: 60,
            lost_reason: null,
            visible_to: 1,
            add_time: "2021-02-11",
          };
        console.log(`submitted`);
        try {
          const res = await fetch('/deal', {
            method: 'POST', 
            body: JSON.stringify(new_deal),
            headers: {
            'Content-Type': 'application/json',
          }
  
        })
          const data = await res.json()
          console.log(data)
          setSub(true)
          setError(false)
        } catch (error) {
          setError(true)
          console.log('there was some error')
        }
        
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
    

    
    </form>
    )
    }
    </>
    
   
  )
}