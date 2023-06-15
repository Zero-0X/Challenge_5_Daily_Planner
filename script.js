$(function () {
  // Save Button listener
  $(".saveBtn").on("click", function () {
    // User Input text
    var userInput = $(this).siblings(".description").val();

    // Get the id of the containing time-block
    var timeBlockId = $(this).parent().attr("id");

    // Save the user input to local storage
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the appropriate class to each time block
  function applyTimeBlockClass() {
    // Get the current hour using Day.js library
    var currentHour = dayjs().hour();

    // Loop through each time block
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove all time-related classes
      $(this).removeClass("past present future");

      // Change the class, which will change the color, to reflect the current hour
      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Retrieve saved user data from localStorage
  function setSavedUserInput() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedUserInput = localStorage.getItem(timeBlockId);

      // Set the value of the textarea with the saved user input
      $(this).find(".description").val(savedUserInput);
    });
  }

  // Display current time in 24HR format
  function updateCurrentTime() {
    var currentTime = dayjs().format("HH:mm:ss");
    currentDayElement.textContent = "Current Time: " + currentTime;
  }

  // Display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY, HH:mm:ss");
    $("#currentDay").text(currentDate);
  }

  applyTimeBlockClass();
  setSavedUserInput();
  displayCurrentDate();
});