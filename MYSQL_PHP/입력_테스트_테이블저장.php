<?
    $DB_SERVER = 'localhost';
    $DB_USER_NAME = 'j8926267';
    $DB_USER_PW = 'jungsh120!';
    $DB_NAME = 'j8926267';

    $conn = mysqli_connect($DB_SERVER, $DB_USER_NAME, $DB_USER_PW, $DB_NAME);
    mysqli_set_charset($conn, 'utf8');

    if($conn===false){
        echo "데이터베이스 접속 실패";
    }
    else {
        echo "데이터베이스 접속 성공";
    }
    
    $user_name = "정서현";
    $user_gender = "여자";
    $user_birth = "20001218";
    $user_id = "frisbee";
    $user_pw = "abcd1234";
    $user_email = "frisbee1@naver.com";
    $user_hp = "01012345678";

    $sql = "INSERT INTO frisbee_signup_table (user_name, user_gender, user_birth, user_id, user_pw, user_email, user_hp) 
            VALUE ('$user_name', '$user_gender', '$user_birth', '$user_id', '$user_pw', '$user_email', '$user_hp')";
    $result = mysqli_query($conn, $sql);

    if($result===true){
        echo "테이블 저장 성공!";
    }
    else {
        echo "테이블 저장 실패!";
    }
?>