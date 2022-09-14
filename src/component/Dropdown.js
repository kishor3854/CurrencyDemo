const Dropdown=({placeholder,value,handleDropDown,name,options=[]})=>{
    return(
        <>
        <select id={name} name={name} value={value} onChange={handleDropDown}>
            <option value="" disabled>{placeholder}</option>
            {options?.map(data=>
                    <option value={data}>{data}</option>
                )
            }
        </select>
    </>
    )
 
}

export default Dropdown;