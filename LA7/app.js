formSubmitHandler = () => {
    const name = document.querySelector('#name');
    const grade = document.querySelectorAll('input[name="grade"]');
    const date_month = document.querySelector('input[name="date_month"]');
    const date_day = document.querySelector('input[name="date_day"]');
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    const quantity = document.querySelectorAll('input.food_input');


    if (name.value === '' || isNaN(name.value) == false) {
        alert('이름에 문자를 입력해 주세요');
        return false;
    } else if (grade[0].checked === false && grade[1].checked === false && grade[2].checked === false) {
        alert('고객의 등급을 선택해 주세요');
        return false;
    } else if (date_month.value === '' || date_day.value === '') {
        alert("날짜에 숫자를 입력해 주세요")
        return false;
    } else if (checkbox[0].checked === false && checkbox[1].checked === false && checkbox[2].checked === false) {
        alert('최소 한 개의 제품을 선택하셔야 합니다.');
        return false;
    }

    if (checkbox[0].checked == true || checkbox[1].checked == true || checkbox[2].checked == true) {
        let ZF = false;
        let TF = false;
        let RF = false;
        checkbox.forEach((item, i) => {
            if (checkbox[i].checked === true && quantity[i].value == 0) {
                ZF = true;
            } else if (checkbox[i].checked === true && quantity[i].value > 10) {
                TF = true;
            }
            if (ZF && TF) {
                alert('선택한 제품을 최소 1개 이상 최대 10개까지만 구매 가능합니다.');
                checkbox.forEach((item, i) => {
                    if (checkbox[i].checked) {
                        const quantityValue = parseInt(quantity[i].value, 10);
        
                        if (quantityValue === 0) {
                            quantity[i].value = 1;
                        } else if (quantityValue > 10) {
                            quantity[i].value = 10;
                        }
                    }
                });
                RF = true;
            }
        });
        if (RF) {
            return false;
        }
    }

    if ((checkbox[0].checked === true && quantity[0].value == 0)) {
        alert('선택한 제품을 최소 1개 이상 구매하셔야 합니다.');
        quantity[0].value = 1;
        return false;
    } else if ((checkbox[1].checked === true && quantity[1].value == 0)) {
        alert('선택한 제품을 최소 1개 이상 구매하셔야 합니다.');
        quantity[1].value = 1;
        return false;
    } else if ((checkbox[2].checked === true && quantity[2].value == 0)) {
        alert('선택한 제품을 최소 1개 이상 구매하셔야 합니다.');
        quantity[2].value = 1;
        return false;
    } else if ((checkbox[0].checked === true && quantity[0].value > 10)) {
        alert('선택한 제품을 최대 10개까지만 구매 가능합니다');
        quantity[0].value = 10;
        return false;
    } else if ((checkbox[1].checked === true && quantity[1].value > 10)) {
        alert('선택한 제품을 최대 10개까지만 구매 가능합니다');
        quantity[1].value = 10;
        return false;
    } else if ((checkbox[2].checked === true && quantity[2].value > 10)) {
        alert('선택한 제품을 최대 10개까지만 구매 가능합니다');
        quantity[2].value = 10;
        return false;
    }

    if (!checkValidDate('2023-' + date_month.value + '-' + date_day.value)) {
        alert('유효한 날짜를 입력해 주세요.');
        return false;
    }

    function checkValidDate(value) {
        var result = true;
        try {
            var date = value.split("-");
            var y = parseInt(date[0], 10),
                m = parseInt(date[1], 10),
                d = parseInt(date[2], 10);
            
            var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
            result = dateRegex.test(d+'-'+m+'-'+y);
        } catch (err) {
            result = false;
        }    
        return result;
    }

    return true;
}