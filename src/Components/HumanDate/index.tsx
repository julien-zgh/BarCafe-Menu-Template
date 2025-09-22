const HumanDate = ({date}: {date: string | Date}) => {
    const d = new Date(date);
    return (
      <span>
        {new Date(d).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    );  
}

export default HumanDate;