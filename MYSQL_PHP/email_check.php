<?
    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');
    
    $user_email = $_POST['user_email'];
 
    $sql = "SELECT user_email FROM frisbee_signup_table WHERE user_email='$user_email'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){
        echo 1;
    }
    else {
        echo 0;
    }
?>