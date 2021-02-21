function bitMask(str) {
  return str
    .split("")
    .reduce((bit, char) => (bit |= 1 << (char.codePointAt() - 97)), 0);
}

function handleFormat(input) {
  input = [...new Set(input)].join("").replace(/[^mdy]/gi, "");
  const mask = bitMask("mdy");
  if ((mask & bitMask(input)) === mask) {
    return input.toLowerCase();
  } else {
    return "mdy";
  }
}

class FormatDate {
  constructor(date = new Date()) {
    if (typeof date === "string") {
      date = date.replace(/\D/g, "/");
    }

    this.date = new Date(date);
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.monthDay = this.date.getDate();
    this.weekDay = this.date.getDay();

    this.dispYear = this.formatYear("fn");
    this.dispMonth = this.formatMonth("fn");
    this.dispDay = this.formatDay("fn");
  }

  get months() {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  get weekDays() {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }

  get standardDate() {
    return this.date.toDateString();
  }

  set formatTypes(formats) {
    let [fYear, fMonth, fDay] = formats.split(" ");
    [fYear, fMonth, fDay] = [
      this.formatYear(fYear),
      this.formatMonth(fMonth),
      this.formatDay(fDay),
    ];
    [this.dispYear, this.dispMonth, this.dispDay] = [fYear, fMonth, fDay];
  }

  display(order = "mdy", separator = "/") {
    order = handleFormat(order);
    // console.log(order);
    let dict = { m: this.dispMonth, d: this.dispDay, y: this.dispYear };
    let positions = order.split("").map((char) => dict[char]);
    return positions.join(separator);
  }

  formatYear(format) {
    switch (format) {
      // full number
      case "fn":
        return String(this.year);
      // partial number
      case "pn":
        return String(this.year).slice(2);
      default:
        return String(this.year);
    }
  }

  formatMonth(format) {
    switch (format) {
      // full string
      case "fs":
        return this.months[this.month];
      // partial string
      case "ps":
        return this.standardDate.split(" ")[1];
      // full number
      case "fn":
        return String(this.month + 1).padStart(2, 0);
      // partial number
      case "pn":
        return String(this.month + 1);
      default:
        return String(this.month + 1).padStart(2, 0);
    }
  }

  formatDay(format) {
    switch (format) {
      // full string
      case "fs":
        return this.weekDays[this.weekDay];
      // partial string
      case "ps":
        return this.standardDate.split(" ")[0];
      // full number
      case "fn":
        return String(this.monthDay).padStart(2, 0);
      // partial number
      case "pn":
        return String(this.monthDay);
      // order number
      case "on":
        let day = String(this.monthDay);
        let suffix;
        if (day.endsWith("1") && day != "11") {
          suffix = "st";
        } else if (day.endsWith("2") && day != "12") {
          suffix = "nd";
        } else if (day.endsWith("3") && day != "13") {
          suffix = "rd";
        } else {
          suffix = "th";
        }
        return day + suffix;
      default:
        return String(this.monthDay).padStart(2, 0);
    }
  }
}

let date = new FormatDate();
let customDate = new FormatDate("2021 2 13");

console.log(customDate.display("mdy", "-"));

customDate.formatTypes = "fn fs pn";
console.log(customDate.display("dmy", " "));
// console.log(customDate.dispYear);
// console.log(customDate.dispMonth);
// console.log(customDate.dispDay);
