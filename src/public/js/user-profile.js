//Hàm cập nhật ảnh khi chọn ảnh đại diện
$(document).ready(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $(".file-upload").on('change', function () {
        readURL(this);
    });
});
//Hàm cập nhật thông tin
$(document).on('submit', '#form-info', async (e) => {
    e.preventDefault();
    const data = {
        fullName: $('#fullName').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
    }

    var rs = await $.ajax({
        type: "POST",
        url: "/user/profile/updateProfile",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
    if (rs.success) {
        $('.success').css('display', 'block');
    }
    else {
        $('.error').css('display', 'block');
    }
})

//Hàm cập nhật mật khẩu
$(document).on('submit', '#form-password', async (e) => {
    e.preventDefault();
    let password = $('#password').val();
    let password2 = $('#password2').val();
    const data = {
        password: password,
    }
    if (password !== password2) {
        alert('Mật khẩu lặp lại không đúng')
    }
    else {
        var rs = await $.ajax({
            type: "POST",
            url: "/user/profile/updatePass",
            contentType: "application/json",
            data: JSON.stringify(data)
        });
        if (rs.success) {
            $('.success').css('display', 'block');
        }
        else {
            $('.error').css('display', 'block');
        }
    }
})

//Hàm cập nhật giới thiệu
$(document).on('submit', '#form-description', async (e) => {
    e.preventDefault();
    let description = $('.description').val();
    const data = {
        description: description,
    }
    var rs = await $.ajax({
        type: "POST",
        url: "/user/profile/updatedes",
        contentType: "application/json",
        data: JSON.stringify(data)
    });
    if (rs.success) {
        $('.success').css('display', 'block');
    }
    else {
        $('.error').css('display', 'block');
    }
})

$(document).on('click', '.nav-link', () => {
    $('.success').css('display', 'none');
    $('.error').css('display', 'none');
})
