function start() {
    load();

}

function load() {
    $.ajax({
        url: 'game.html',
        success: function(data) {
            $('#container').html(data);
        }
    });
}