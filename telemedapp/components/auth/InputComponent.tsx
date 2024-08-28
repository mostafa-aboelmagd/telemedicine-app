import styles from "./InputComponent.module.css";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  additionalText?: string;
}

const InputComponent = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  additionalText,
}: InputProps) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.inputLabel}>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.inputField}
      />
      {additionalText && (
        <small className={styles.additionalText}>{additionalText}</small>
      )}
    </div>
  );
};

export default InputComponent;
