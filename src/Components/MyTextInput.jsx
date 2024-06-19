export default function MyTextInput(props) {
  const {placeHolder, required, type, pattern} = props
  return (
    <input 
    className="inputField"
    type={type}
    placeholder={placeHolder} 
    required={required} 
    pattern={pattern? pattern : ''}/>    
  )
}
