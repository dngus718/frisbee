<?
    // http://j8926267.dothome.co.kr/
    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');
    
    $user_name   = $_POST['user_name'];
    $user_gender = $_POST['user_gender'];
    $user_birth  = $_POST['user_birth'];
    $user_id     = $_POST['user_id'];
    $user_pw     = $_POST['user_pw'];
    $user_email  = $_POST['user_email'];
    $user_hp     = $_POST['user_hp'];

    $sql = "INSERT INTO frisbee_signup_table (user_name, user_gender, user_birth, user_id, user_pw, user_email, user_hp) 
            VALUE ('$user_name', '$user_gender', '$user_birth', '$user_id', '$user_pw', '$user_email', '$user_hp')";
    $result = mysqli_query($conn, $sql);

    if($result===true){
        echo 1;
    }
    else {
        echo 0;
    }
?>