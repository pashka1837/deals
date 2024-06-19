import Box from "../Box/Box";
import MyTextInput from "../MyTextInput";
import MySelect from "../MySelect";

export default function LocationCard() {
    const area_options = ["Tampa", "Miami", "Jacksonville"]
  return (
    <Box title="Service Location">
    <MyTextInput placeHolder="Address" required={true} type="text" /> 
    <MyTextInput placeHolder="City" required={true} type="text" /> 
    <MyTextInput placeHolder="State" required={true} type="text" /> 
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
    <MyTextInput placeHolder="Zip code" required={true} type="tel" pattern="[0-9]{5}" /> 
    <MySelect options={area_options} name='Area' />
    </div>      
    </Box>
  )
}