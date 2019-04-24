$("#submit").on("click", function () {

    event.preventDefault();
    // Validate if there are any blank answers in the survey


    var name = $("name").text();
    var photo = $("photo").text();

    console.log()
    console.log(name);
    console.log(photo);

    function validateForm() {
        var isValid = true;
        $('.chosen-select').each(function () {
            if ($(this).val() === '')
                isValid = false;
        });

        return isValid;
    }



    // if all questions have been answered do 
    if (validateForm() == true) {
        // var userData = [];
        // // $.each($(".chosen-select option:selected"), function () {
        //     userData.push($(this).val());

        // });

        var userData = {
            scores: [$("#question1").val(), $("#question2").val(), $("#question3").val(), $("#question4").val(), $("#question5").val()]
        }

        console.log(userData)
        var URL = window.location.origin;
        console.log(URL)
        $.ajax({
            method: "POST",
            url: URL + "/api/friends",
            data: {
                name: name,
                photo: photo,
                scores: userData.scores,
            },
            success: function (data) {
                console.log(data);
                $("#resultsModal").modal();
                $("#matchName").text(data.name);
                $('#matchImg').attr("src", data.photo);

                alert("Your new best friend is " + data.name + ". If you want to see a picture of them copy and past this link into your browser. " + data.photo)
            },
            complete: function () {
                console.log("complete")
            }
        })
    } else {
        alert("Please complete all answers of the survey before continuing")
    }

    return false;
});
$('#resultsModal').on('hidden.bs.modal', function () {
    window.location.reload(true);
});