import Event from "./Event";
import "./Days.css";

const Days = ({ dayNumber }) => {
    const date = new Date(2025, 0, dayNumber); // Assuming January 2025

    return (
        <div className="day">
            <span className="day-number">{dayNumber}</span>
            <Event date={date} />
        </div>
    );
};

export default Days;
