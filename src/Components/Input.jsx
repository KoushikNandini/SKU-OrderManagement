const Input = ({label,name,value,handleonChange,error,...rest}) => {
    return (
        <div className="mb-3">
            <label className="form-label">{ label }</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleonChange}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                {...rest}
                
            />
            {error && <div className="invalid-feedback">{error}</div>}
        
        </div>
    )
}

export default Input