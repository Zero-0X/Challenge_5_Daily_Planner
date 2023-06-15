$(function () {
  // Listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();

    // Get the id of the containing time-block
    var timeBlockId = $(this).parent().attr("id");

    // Save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  function applyTimeBlockClass() {
    // Get the current hour using Day.js library
    var currentHour = dayjs().hour();

    // Loop through each time block
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove all time-related classes
      $(this).removeClass("past present future");

      // Add the appropriate class based on the comparison with the current hour
      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Get user input from localStorage and set textarea values
  function setSavedUserInput() {
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var savedUserInput = localStorage.getItem(timeBlockId);

      // Set the value of the textarea with the saved user input
      $(this).find(".description").val(savedUserInput);
    });
  }

  // Display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Call the necessary functions
  applyTimeBlockClass();
  setSavedUserInput();
  displayCurrentDate();
});