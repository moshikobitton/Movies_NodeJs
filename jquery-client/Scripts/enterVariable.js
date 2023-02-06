

userLogin = false;
userLogin.type = 'C';

function enableHref() {
    $("#insert").off("click", alertLogin);
    $("#view").off("click", alertLogin);
    $("#view").attr("href", "viewMovie.html");
    $("#insert").attr("href", "insert.html");
    $("#dataTable").off("click", alertLogin);
    $("#dataTable").attr("href", "DataTable.html");
}

function alertLogin(e) {
    e.preventDefault();
    swal("You need to login or register","", "warning");
}

function disableHref() {
    $("#view").attr("href", "");
    $("#insert").attr("href", "");
    $("#insert").click(alertLogin);
    $("#view").click(alertLogin);
    $("#dataTable").attr("href", "");
    $("#dataTable").click(alertLogin);
}

function getUserLogin() {
    if (localStorage.getItem("cgroup1") != undefined) {
        userLogin = JSON.parse(localStorage.getItem("cgroup1"));
        $("#login").html("Log out");
    }
    else {
        userLogin = false;
        setUserLogin(false);
        disableHref();
    }
    hideManagerPages();
}

function setUserLogin(isLogin) {
    if (isLogin != false)
        localStorage.setItem("cgroup1", JSON.stringify(userLogin));
    else localStorage.removeItem("cgroup1");
}

function hideManagerPages(){
    if (userLogin.type != 'M')
        $('#dataTable').hide();
    else $('#dataTable').show();
}
