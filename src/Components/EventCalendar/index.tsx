import { useState } from "react";
import GeneralModal from "../Modal/GeneralModal";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import SpecialImage from "../SpecialImage";
import HumanDate from "../HumanDate";
import SafeHtml from "../SafeHTML";

interface EventCalendarProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}

interface Event {
  title: string;
  dateNtime: string;
  description: string;
  thumbnail: string;
}

const events: Record<string, Event[]> = {
  "2025-09-27": [
    {
      title: "Morning Yoga Session",
      dateNtime: "2025-09-27 06:00 PM",
      description:
        "The Fan is going to Byblos this Saturday, hosted by @spacecafebar for a proper season closing. Music starts at 6pm so be there early.<br />Lineup: @andreo.wav @bobgemaa @j_bitar @sarahouss @yaramorkos<br />Sound system is brought to you by none else than @wavetablestudios<br />Oh and no tickets this time, Free Entrance!",
      thumbnail: "/events/event1.jpg",
    },
  ],
};

export const EventCalendar: React.FC<EventCalendarProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDayClick = (
    date: Dayjs,
    event: React.MouseEvent<HTMLElement>
  ) => {
    const dateStr = date.format("YYYY-MM-DD");
    if (events[dateStr]) {
      setSelectedDate(dateStr);
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedDate(null);
  };

  const CustomDay = (props: PickersDayProps) => {
    const { day, ...other } = props;
    const dateStr = day.format("YYYY-MM-DD");
    const hasEvent = !!events[dateStr];

    return (
      <PickersDay
        {...other}
        day={day}
        onClick={(e) => handleDayClick(day, e)}
        sx={{
          borderBottom: hasEvent ? "2px solid #e10b0bff" : "none",
          borderRadius: 0,
        }}
      />
    );
  };

  return (
    <GeneralModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="w-full h-full text-black">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar slots={{ day: CustomDay }} />
        </LocalizationProvider>

        <GeneralModal isOpen={!!anchorEl} onClose={handlePopoverClose}>
          <div
            className="w-full sm:w-3/4 md:w-1/2 lg:w-full mx-auto p-6 text-black flex flex-col gap-6 
               overflow-y-auto bg-[#f2e6d3]"
            onWheel={(e) => e.stopPropagation()} // Prevent scroll bubbling to parent
            onTouchMove={(e) => e.stopPropagation()} // Mobile touch scroll fix
          >
            {selectedDate &&
              events[selectedDate].map((ev, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col items-center rounded-2xl p-4"
                >
                  {/* Fixed image container with proper aspect ratio */}
                  <div className="w-full relative rounded-xl overflow-hidden mb-4">
                    <SpecialImage
                      src={ev.thumbnail}
                      alt="Event Image"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>

                  <Typography
                    variant="h4"
                    className="font-bold mb-2 text-center"
                  >
                    {ev.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    className="text-red-600 font-medium mb-2"
                  >
                    <HumanDate date={ev.dateNtime} />
                  </Typography>

                  <Typography
                    className="text-gray-700"
                    component="div"
                  >
                    <SafeHtml html={ev.description} />
                  </Typography>
                </div>
              ))}
          </div>
        </GeneralModal>
      </div>
    </GeneralModal>
  );
};
