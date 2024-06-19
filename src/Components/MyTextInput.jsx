export default function MyTextInput(props) {
  const {placeHolder, required, type, pattern, name} = props;
  return (
    <input 
    className="inputField"
    name={name}
    type={type}
    placeholder={placeHolder} 
    required={required} 
   />    
  )
}

// pattern={pattern? pattern : "[A-Za-z]{12}"}
