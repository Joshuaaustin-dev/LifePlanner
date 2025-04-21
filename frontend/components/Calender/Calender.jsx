import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Draggable } from "@fullcalendar/interaction";
import "./Calender.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import useUser from "../Hooks/userUser";

const Calendar = () => {
  const { user, error } = useUser();
  const [userSkills, setUserSkills] = useState([]);
  const [selectedSkill, setSelectedSkills] = useState();
  const [skillDay, setSkillDay] = useState([{}]);
  const [taskDay, setTaskDay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [scheduledTasks, setScheduledTasks] = useState(new Set());

  const draggableRef = useRef(null);

  // Retrieve user skills
  useEffect(() => {
    setIsLoading(true);
    axios
      .post("http://localhost:5000/calendar-api/get-skills", user, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.skills === undefined) {
          return {};
        }
        if (response.data.skills.length === 0) {
          return;
        }
        const skill = response.data.skills;
        setUserSkills(skill);
        setSelectedSkills(skill[skill.length - 1]);
        const formatted = skill[skill.length - 1].day.map((days, index) => {
          const isAllDay = days.date.split("T")[1] === "00:00:00.000Z";
          return {
            id: index,
            title: days.content,
            start: isAllDay ? days.date.split("T")[0] : days.date,
            allDay: isAllDay,
            source: "database",
          };
        });
        // Basically an event specific to FulLCalendar
        setSkillDay(formatted);

        // First skill in dropdown and all the days (Date, content)
        setTaskDay(skill[skill.length - 1].day);
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [user]);

  // Create a draggable for the right div
  useEffect(() => {
    if (draggableRef.current && taskDay.length > 0) {
      const draggableInstance = new Draggable(draggableRef.current, {
        itemSelector: ".task",
        eventData: function (e) {
          // Return the same event data as before
          return {
            id: e.dataset.index,
            title: e.dataset.title,
            source: "dragbox",
          };
        },
      });
      return () => {
        draggableInstance.destroy(); // Ensures proper cleanup of the draggable instance
      };
    }
  }, [taskDay]);

  useEffect(() => {
    const updatedScheduledTasks = new Set(skillDay.map((event) => event.id));
    setScheduledTasks(updatedScheduledTasks);
  }, [skillDay]);

  const handleSelectChange = async (e) => {
    const selected = JSON.parse(e.target.value);
    await setSelectedSkills(selected);
    const formatted = selected.day.map((days, index) => ({
      id: index,
      title: days.content,
      start: days.date,
      source: "database",
    }));
    setSkillDay(formatted);
    setTaskDay(selected.day);
  };

  const handleEventDrop = (e) => {
    const date = e.date.toISOString();
    const skillID = e.draggedEl.dataset.id;

    setScheduledTasks((prevScheduledTasks) => {
      const updatedScheduledTasks = new Set(prevScheduledTasks);
      updatedScheduledTasks.add(parseInt(e.draggedEl.dataset.index));
      return updatedScheduledTasks;
    });

    axios
      .post("http://localhost:5000/calendar-api/update-skill", {
        user,
        skillID,
        date,
      })
      .then((response) => {
        console.log("Added");
      });
  };

  const handleEventChange = (e) => {
    const date = e.event.start.toISOString();
    const skillID = taskDay[e.event.id]._id;
    axios
      .post("http://localhost:5000/calendar-api/update-skill", {
        user,
        skillID,
        date,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const handleEventClick = (e) => {
    const date = null;
    const skillID = taskDay[e.event.id]._id;

    setScheduledTasks((prevScheduledTasks) => {
      const updatedScheduledTasks = new Set(prevScheduledTasks);
      updatedScheduledTasks.delete(parseInt(e.event.id));
      return updatedScheduledTasks;
    });
    e.event.remove();

    axios
      .post("http://localhost:5000/calendar-api/update-skill", {
        user,
        skillID,
        date,
      })
      .then((response) => {});
  };

  return (
    <>
      <div className="header ">
        <h1>Calendar</h1>
      </div>
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
            height="88vh"
            timeZone="UTC"
            events={skillDay}
            editable={true}
            droppable={true}
            drop={handleEventDrop}
            eventChange={handleEventChange}
            eventClick={handleEventClick}
            handleWindowResize={true}
          ></FullCalendar>
        </div>
        <div className="drag" ref={draggableRef}>
          <div className="task-header">
            <select
              value={JSON.stringify(selectedSkill)}
              onChange={handleSelectChange}
            >
              {userSkills.map((skill, index) => (
                <option key={index} value={JSON.stringify(skill)}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="loading">
              <div></div>
            </div>
          ) : (
            taskDay.map((task, index) => {
              if (
                !scheduledTasks.has(index) ||
                task.date === new Date(0).toISOString()
              ) {
                return (
                  <div
                    key={index}
                    className="task"
                    data-index={index}
                    data-title={task.content}
                    data-id={task._id}
                  >
                    <p>{task.content}</p>
                  </div>
                );
              } else {
                return null;
              }
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
