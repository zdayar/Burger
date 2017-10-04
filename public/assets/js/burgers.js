// wait to attach our handlers until the DOM is fully loaded.
$(function () {

    // jQuery event handlers

    // Add a new burger
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger_name").val().trim()
        };

        // Send the POST request to add burger.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("added new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".devour").on("click", function (event) {
        var id = $(this).data("id");

        // Send the PUT (update) request to devour burger.
        $.ajax("/api/burgers/" + id, {
            type: "PUT"
        }).then(
            function () {
                console.log("devoured burger ", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});
