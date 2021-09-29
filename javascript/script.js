const API_ =  'http://10.91.13.144:8000/detect'
const API_ngrok = 'http://e9b4-113-161-196-10.ngrok.io/detect'
const API_KML = 'http://10.91.13.144:81'
const API_KML_ngrok = 'http://087f-113-161-196-10.ngrok.io'
$(document).ready(function (e) {
    $("#btn-xuly").click(function () {
        var fd = new FormData();
        var files = $('#file')[0].files;
        
        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);
            $.ajax({
                url: API_ngrok, 
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response != 0) {
                        console.log(response);
                       // var b64Response = btoa(unescape(encodeURIComponent((response))))
                        $('#img').attr('src','data:image/png;base64,'+response.data)
                        $('#modalImage').modal("show")
                    } else {
                        alert('file not uploaded');
                    }
                },
            });
        } else {
            alert("Please select a file.");
        }
    });
    $("#file").change(function () {
        
        var fd = new FormData();
        var files = $('#file')[0].files;
        
        // Check file selected or not
        if (files.length > 0) {
            fd.append('file', files[0]);
            $.ajax({
                url: API_KML_ngrok, 
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function (response) {
                    $('#result').text(response)
                     $('#modalImage').modal("show")
                },
            });
        } else {
            alert("Please select a file.");
        }
    });
    $('#btn-copy').click(function () {
        $("#btn-copy").notify("copied", 'success');
        copyToClipboard('#result');
    })
    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        console.log($temp);
        $temp.val($(element).text()).select();
        navigator.clipboard.writeText($temp.val());
        $temp.remove();
    }
    
});
