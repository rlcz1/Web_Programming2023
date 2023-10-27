<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>목요실습3</title>
</head>
<body>
    <form action="result.php" method="post">
        <p>데이터 저장하기</p>
        <div>
            <span>이름 : </span>
            <input type="text" name="name" id="name">
        </div>
        <div>
            <span>키 : </span>
            <input type="text" name="value" id="value">
            <span> cm</span>
        </div>
        <input type="submit" value="저장">
    </form>

    <form action="search.php" method="get">
        <p>데이터 검색하기</p>
        <div>
            <span>값 : </span>
            <input type="text" name="val" id="val">
        </div>
        <div>
            <input type="radio" name="radio" id="radio" value="name">
            <span>이름</span>
            <input type="radio" name="radio" id="radio" value="value">
            <span>키</span>
        </div>
        <input type="submit" value="검색">
    </form>

    <form action="delete.php" method="get">
        <p>데이터 삭제하기</p>
        <div>
            <span>삭제할 데이터 : </span>
            <input type="text" name="val" id="val">
        </div>
        <div>
            <input type="radio" name="radio" id="radio" value="name">
            <span>이름</span>
            <input type="radio" name="radio" id="radio" value="value">
            <span>키</span>
        </div>
        <input type="submit" value="삭제">
    </form>

    <form action="modify.php" method="get">
        <p>데이터 수정하기</p>
        <div>
            <span>수정 전 키 : </span>
            <input type="text" name="current">
        </div>
        <div>
            <span>수정 후 키 : </span>
            <input type="text" name="update">
        </div>
        <input type="submit" value="수정">
    </form>
</body>
</html>