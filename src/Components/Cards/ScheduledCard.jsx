import Box from "../Box/Box";
import MyTextInput from "../MyTextInput";
import MySelect from "../MySelect";


export default function ScheduledCard() {
    const start_time_options = ["08:00","10:00","12:00","14:00","16:00"];
    const end_time_options = ["08:00","10:00","12:00","14:00","16:00"];
    const tech_options = ["Tech1","Tech2","Tech3","Tech4","Tech5"];



    return (
        <Box title="Service Location">
        <MyTextInput 
        placeHolder="" 
        required={true} 
        type="date" 
        name='Start Date'/> 
        
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
        <MySelect options={start_time_options} name='Job start time' />
        <MySelect options={end_time_options} name='Job end time' />
        </div>      
        <MySelect options={tech_options} name='Technician' />

        </Box>
      )
    }