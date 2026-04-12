type InputProps = {
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    type: "text" | "email" | "password" | "number";
    id: string;
    className?: string;
    required?: boolean;
    onBlur?: (value: string) => void;
}

export const Input = (props: InputProps) => {
    return (
        <div className="form-control flex flex-col">
            {props.label && (
              <label htmlFor={props.id} className="label mb-1 mt-2">
                <span className="label-text text-black">
                {props.label}
                </span>
              </label>
            )}

            <input 
                id={props.id}
                type={props.type} 
                value={props.value}
                onChange={(e) => props.onChange?.(e.target.value)}
                onBlur={(e) => props.onBlur?.(e.target.value)}

                
                className={`input ${props.className}`}
                required={props.required}
            />
      </div>
    );
};