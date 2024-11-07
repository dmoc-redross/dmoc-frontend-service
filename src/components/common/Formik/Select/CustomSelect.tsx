import Select from "react-select";
import "./CustomSelect.scss";

const CustomSelect = (props: {
  value: any;
  onChange: any;
  options?: any;
  defaultValue?: any;
  menuIsOpen?: boolean;
  isSearchable?: boolean;
  closeMenuOnSelect: any
}) => {
  const {options, menuIsOpen, isSearchable, defaultValue, value, onChange, closeMenuOnSelect } = props;
  return (
    <div>
      {/* {value && value[0]?.label && <label >{value[0]?.label}</label>} */}
      <Select
        defaultValue={defaultValue.label}
        value={value}
        onChange={onChange}
        options={options}
        menuIsOpen={menuIsOpen}
        className="common-select"
        classNamePrefix="react-select"
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
      />
    </div>
  );
};

export default CustomSelect;
