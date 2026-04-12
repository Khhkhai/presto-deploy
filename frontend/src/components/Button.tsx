type ButtonProps = {
    onClick?: () => void;
    type?: "button" | "submit"
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    return (
      <button 
        type={props.type} 
        onClick={props.onClick} 
        className={`btn btn-soft btn-primary m-1 ${props.className} `}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
};
  
