import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerr from "react-datepicker";

const Datepicker = (props: any) => {
  return (
    <div className={`react_datepicker ${props.className}`}>
      <DatePickerr
        selected={props?.selected}
        onChange={props?.onChange}
        showIcon={props.showIcon}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        minDate={props?.minDate}
        maxDate={props?.maxDate}
        disabled={props?.disabled}
      />
    </div>
  );
};

export default Datepicker;
