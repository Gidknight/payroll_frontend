const TextWithLabel = ({
  text = "not provided",
  label,
  cap = true,
  bold = false,
  textsize = "text-lg",
}: {
  text: string | number | null;
  label: string;
  cap?: boolean;
  bold?: boolean;
  textsize?: string;
}) => (
  <p
    className={`flex flex-row items-center justify-between w-full ${
      bold && "font-semibold text-black"
    }`}
  >
    <span className="text-base capitalize whitespace-nowrap">{label}:</span>

    <span
      className={`
                whitespace-wrap    
              ${cap && "capitalize"} 
              ${textsize}      
            `}
    >
      {text}
    </span>
  </p>
);

export default TextWithLabel;
