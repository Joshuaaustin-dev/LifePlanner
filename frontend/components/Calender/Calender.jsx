import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Draggable } from "@fullcalendar/interaction";
import "./Calender.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Calendar = () => {
  const [user, setUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [selectedSkill, setSelectedSkills] = useState();
  const [skillDay, setSkillDay] = useState([{}]);
  const [taskDay, setTaskDay] = useState([]);
  const [userStore, setUserStore] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser != null) {
      setUserStore(storedUser);
    }
  }, []);

  useEffect(() => {
    if ((userStore !== null) & (userStore !== undefined)) {
      axios
        .post("http://localhost:5000/get-user", userStore)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, [userStore]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/calendar-api/get-skills", user)
      .then((response) => {
        if (response.data.skills.length === 0) {
          return;
        }
        const skill = response.data.skills;
        setUserSkills(skill);
        setSelectedSkills(skill[0]);
        const formatted = skill[0].day.map((days, index) => ({
          id: index,
          title: days.content,
          start: days.date.split("T")[0],
        }));
        setSkillDay(formatted);
        setTaskDay(skill[0].day);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [user]);

  /*
  useEffect(() => {
    let draggableEl = document.getElementById("tasks");
    new Draggable(draggableEl, {
      itemSelector: ".task",
      eventData: (eventEl) => ({
        title: eventEl.getAttribute("data-title"),
      }),
    });
  }, []);
*/

  const handleChange = async (e) => {
    const selected = JSON.parse(e.target.value);
    await setSelectedSkills(selected);
    const formatted = selected.day.map((days, index) => ({
      id: index,
      title: days.content,
      start: days.date.split("T")[0],
    }));
    setSkillDay(formatted);
    setTaskDay(selected.day);
  };
  return (
    <div className="flex-container">
      <div className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          height="100vh"
          events={skillDay}
          editable={true}
          droppable={false}
        ></FullCalendar>
      </div>
      <div className="drag">
        <div className="task-header">
          <select value={JSON.stringify(selectedSkill)} onChange={handleChange}>
            {userSkills.map((skill, index) => (
              <option key={index} value={JSON.stringify(skill)}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        {/*
        {taskDay.map((task, index) => (
          <div
            key={index}
            className="task"
            id="tasks"
            data-title={task.content}
          >
            {task.content}
          </div>
        ))}
        */}
      </div>
    </div>
  );
};

export default Calendar;
