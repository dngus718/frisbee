<?
    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');
    
    $user_id = $_POST['user_id'];
 
    $sql = "SELECT user_id FROM frisbee_signup_table WHERE user_id='$user_id'";
    $result = mysqli_query($conn, $sql);

    if(mysqli_num_rows($result) > 0){
        echo 1;
    }
    else {
        echo 0;
    }
?>