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
import { Calendar } from "lucide-react";

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

interface ButtonProps {
  closeFunction: () => void;
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

const Button = ({ closeFunction }: ButtonProps) => {
  return (
    <div className="w-full flex justify-center">
      <button
        className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group mt-4 hover:cursor-pointer"
        type="button"
        onClick={closeFunction}
      >
        <div className="bg-[#6F4E37] rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            ></path>
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </button>
    </div>
  );
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
    <GeneralModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="max-w-md"
    >
      <div className="w-full h-full text-black">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar slots={{ day: CustomDay }} />
        </LocalizationProvider>

        <GeneralModal isOpen={!!anchorEl} onClose={handlePopoverClose}>
          <div
            className="w-full mx-auto p-6 text-black flex flex-col gap-6 
     overflow-y-auto bg-[#f2e6d3]"
            onWheel={(e) => e.stopPropagation()} // Prevent scroll bubbling to parent
            onTouchMove={(e) => e.stopPropagation()} // Mobile touch scroll fix
          >
            {selectedDate &&
              events[selectedDate].map((ev, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col lg:flex-row items-center lg:items-start rounded-2xl p-4 lg:gap-8"
                >
                  {/* Image container - full width on mobile, fixed width on large screens */}
                  <div className="w-full lg:w-1/2 lg:flex-shrink-0 relative rounded-xl overflow-hidden mb-4 lg:mb-0">
                    <SpecialImage
                      src={ev.thumbnail}
                      alt="Event Image"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-xl"
                    />
                  </div>

                  {/* Content container - stacked on mobile, side-by-side on large screens */}
                  <div className="w-full lg:w-3/5 flex flex-col lg:justify-start lg:pl-6">
                    <Typography
                      variant="h4"
                      className="font-bold mb-2 text-center lg:text-left lg:text-5xl"
                    >
                      {ev.title}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      className="flex items-center justify-center text-red-600 font-medium mb-4 text-xl"
                    >
                      <Calendar className="mr-2" />
                      <HumanDate date={ev.dateNtime} />
                    </Typography>

                    <Typography
                      className="text-gray-700 text-center lg:text-left lg:text-lg lg:leading-relaxed"
                      component="div"
                    >
                      <SafeHtml html={ev.description} />
                    </Typography>

                    <Button closeFunction={handlePopoverClose} />
                  </div>
                </div>
              ))}
          </div>
        </GeneralModal>
      </div>
      <div className="mb-3">
        <Button closeFunction={() => setIsOpen(false)} />
      </div>
    </GeneralModal>
  );
};
