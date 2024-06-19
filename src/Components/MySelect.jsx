

export default function MySelect({options, name}) {
  return (
    <select 
    className="inputField"
    name={name}
    >
        {options.map((opt)=>(
            <option   
            key={opt}
            value={opt}>
            {opt}
            </option>
        ))}
    </select>
  )
}