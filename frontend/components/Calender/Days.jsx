import Event from "./Event";
import "./Days.css";

const Days = ({ monthNumber, dayNumber }) => {
    const date = new Date(2025, monthNumber, dayNumber); 
    return (
        <div className="day">
            <span className="day-number">{dayNumber}</span>
            <Event date={date} />
        </div>
    );
};

export default Days;
