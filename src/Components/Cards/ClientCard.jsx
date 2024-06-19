import Box from "../Box/Box";
import MyTextInput from "../MyTextInput";

export default function ClientCard() {
  return (
    <Box title="Client details">
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
    <MyTextInput 
    placeHolder="First Name" 
    required={true} 
    type="text" 
    name="First Name" /> 

    <MyTextInput 
    placeHolder="Last Name" 
    required={true} 
    type="text" 
    name="Last Name"/> 
    </div>
    
    <MyTextInput 
    placeHolder="Phone" 
    required={true} 
    type="tel" 
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
    name="Phone"/>

    <MyTextInput 
    placeHolder="Email (optional)" 
    required={false} 
    type="email" 
    name="Email"/> 
  </Box>
  )
}