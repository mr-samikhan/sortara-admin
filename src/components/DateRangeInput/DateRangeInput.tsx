import { useState } from "react";

const DateRangeInput = () => {
  const [dateRange, setDateRange] = useState("");
  const [error, setError] = useState("");

  const validateDateRange = (input: any) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(input)) {
      setError("Invalid date format. Please use MM/DD/YYYY - MM/DD/YYYY");
      return false;
    }

    const [startDate, endDate] = input
      .split(" - ")
      .map((date: any) => new Date(date));
    if (startDate > endDate) {
      setError("Start date cannot be after end date.");
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (e: any) => {
    const input = e.target.value;
    setDateRange(input);
    validateDateRange(input);
  };

  return (
    <div>
      <input
        type="text"
        value={dateRange}
        onChange={handleChange}
        placeholder="MM/DD/YYYY - MM/DD/YYYY"
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default DateRangeInput;
