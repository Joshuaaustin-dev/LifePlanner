import Days from "./Days";
import "./Calender.css"

const Calendar = () => {
    const getDaysInMonth = () => {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); 
    };

    const getMonthName = (monthIndex) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthIndex];
    };
    
    const daysInMonth = getDaysInMonth();
    const date = new Date();
    const currentMonth = getMonthName(date.getMonth());

    return (
        <div className="calendar">
            <h1>{currentMonth}</h1>
            <div className="days-container">
                {Array.from({ length: daysInMonth }, (_, index) => (
                    <Days key={index} monthNumber={date.getMonth()} dayNumber={index + 1} />  
                ))}
            </div>
        </div>
    );
};

export default Calendar;
