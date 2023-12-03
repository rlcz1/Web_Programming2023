<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HW2</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body>
    <div id="header" class="col-lg-12">
        <h1>나의 일지</h1>
    </div>
    <div id="option" class="col-lg-12">
        <div class="monthSelect">
            <span>달력 : </span>
            <select name="" id="monthSelect">
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        </div>
        <div class="options">
            <input type="checkbox"  id="todoCheckbox" data-filter="todo">
            <span>할일</span>
            <input type="checkbox" id="meetingCheckbox" data-filter="meeting">
            <span>회의</span>
            <input type="checkbox" id="ideaCheckbox" data-filter="idea">
            <span>아이디어</span>
            <input type="checkbox" id="shoppingCheckbox" data-filter="shopping">
            <span>쇼핑목록</span>
        </div>
    </div>
    <div id="content">
        <div id="calendar" class="col-lg-9 col-sm-12">
            <table>
                <thead>
                    <tr>
                        <th>SUN</th>
                        <th>MON</th>
                        <th>THE</th>
                        <th>WED</th>
                        <th>THU</th>
                        <th>FRI</th>
                        <th>SAT</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
        <div id="list" class="col-lg-3 col-sm-12">
            <div class="todo_list">
                <div class="todo_item todo">
                    <input type="radio">
                    <span>할일</span>
                </div>
            </div>
            <div class="delete_list">
                <div class="todo_item todo">
                    <input type="radio">
                    <span>할일</span>
                </div>
            </div>
        </div>
    </div>


    <form id="writeFrm" class="modal" method="post" enctype="multipart/form-data">
        <input type="hidden" name="month">
        <input type="hidden" name="date">
        <div class="item">
            <span>제목 : </span>
            <input type="text" name="title">
        </div>
        <div class="item">
            <span>설명 : </span>
            <textarea name="content" id="" cols="30" rows="5"></textarea>
        </div>
        <div class="item">
            <span>분류 : </span>
            <select name="type" id="modalSelect">
                <option value="todo">할일</option>
                <option value="meeting">회의</option>
                <option value="idea">아이디어</option>
                <option value="shopping">쇼핑목록</option>
            </select>
        </div>
        <div class="item">
            <span>파일 : </span>
            <input type="file" name="file">
        </div>
        <div class="item">
            <button type="button" id="writeFrmBtn">저장</button>
            <button type="button" class="modalCloseBtn">취소</button>
        </div>
    </form>


    <form id="modifyModal" class="modal" method="post" enctype="multipart/form-data">
        <input type="hidden" name="id">
        <!-- <div class="item">
            <span id="modifyModalEdit">
                <i class="material-icons">mode_edit</i>
            </span>
            <span id="modifyModalDelete">
                <i class="material-icons">delete</i>
            </span>
            <span id="modifyModalClose" class="modalCloseBtn">
                <i class="material-icons">close</i>
            </span>
        </div> -->
        <div class="item">
            <span>제목 : </span>
            <input type="text" name="title" disabled>
        </div>
        <div class="item">
            <span>설명 : </span>
            <textarea name="content" cols="30" rows="5" disabled></textarea>
        </div>
        <div class="item">
            <span>분류 : </span>
            <select name="type" id="modalSelect" disabled>
                <option value="todo">할일</option>
                <option value="meeting">회의</option>
                <option value="idea">아이디어</option>
                <option value="shopping">쇼핑목록</option>
            </select>
        </div>
        <div class="item">
            <span>파일 : </span>
            <a href="" target="_blank" class="modifyFileName"></a>
            <input type="file" name="file">
        </div>
        <div class="item" id="viewModalBtns">
            <button type="button" class="modifyBtn">수정</button>
            <button type="button" class="modalCloseBtn">취소</button>
        </div>
        <div class="item" id="modifyModalBtns">
            <button id="modifyModalSaveBtn">제출</button>
            <button type="button" class="modalCloseBtn">취소</button>
        </div>
    </div>
</body>
<script src="app.js"></script>

</html>