 // 文字效果
   $(function(){
   	var particles = function() {
        var bubbles = function() {
            var density = 100;
            var uppersize = 6;
            var lowersize = 3;
        };
    };

    function initparticles() {
        bubbles();
        lines();
        confetti();
        fire();
        sunbeams();
    }

    function bubbles() {
        $.each($(".particletext.bubbles"), function() {
            var bubblecount = ($(this).find(".text").width() / 50) * 10 || 30;
            for (var i = 0; i <= bubblecount; i++) {
                var size = $.rnd(6, 12);
                $(this).append('<span class="particle" style="top:' + $.rnd(20, 80) + '%; left:' + $.rnd(0, 95) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>');
            }
        });
    }

    function lines() {
        $.each($(".particletext.lines"), function() {
            var linecount = ($(this).find(".text").width() / 50) * 10 || 30;
            for (var i = 0; i <= linecount; i++) {
                $(this).append('<span class="particle" style="top:' + $.rnd(-30, 50) + '%; left:' + $.rnd(-10, 110) + '%;width:' + $.rnd(1, 3) + 'px; height:' + $.rnd(20, 80) + '%;animation-delay: -' + ($.rnd(0, 30) / 10) + 's;"></span>');
            }
        });
    }

    function confetti() {
        $.each($(".particletext.confetti"), function() {
            var confetticount = ($(this).find(".text").width() / 50) * 10 || 30;
            for (var i = 0; i <= confetticount; i++) {
                $(this).append('<span class="particle c' + $.rnd(1, 2) + '" style="top:' + $.rnd(10, 50) + '%; left:' + $.rnd(0, 100) + '%;width:' + $.rnd(6, 8) + 'px; height:' + $.rnd(3, 4) + 'px;animation-delay: ' + ($.rnd(0, 30) / 10) + 's;"></span>');
            }
        });
    }

    function fire() {
        $.each($(".particletext.fire"), function() {
            var firecount = ($(this).find(".text").width() / 50) * 20 || 60;
            for (var i = 0; i <= firecount; i++) {
                var size = $.rnd(8, 12);
                $(this).append('<span class="particle" style="top:' + $.rnd(40, 70) + '%; left:' + $.rnd(-10, 100) + '%;width:' + size + 'px; height:' + size + 'px;animation-delay: ' + ($.rnd(0, 20) / 10) + 's;"></span>');
            }
        });
    }

    function sunbeams() {
        $.each($(".particletext.sunbeams"), function() {
            var linecount = ($(this).find(".text").width() / 50) * 10 || 30;
            for (var i = 0; i <= linecount; i++) {
                $(this).append('<span class="particle" style="top:' + $.rnd(-50, 00) + '%; left:' + $.rnd(0, 100) + '%;width:' + $.rnd(1, 3) + 'px; height:' + $.rnd(80, 160) + '%;animation-delay: -' + ($.rnd(0, 30) / 10) + 's;"></span>');
            }
        });
    }

    jQuery.rnd = function(m, n) {
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor(Math.random() * (n - m + 1)) + m;
    }
    initparticles();
})


 // 图片上传
 $(document).ready(function(){
                // Basic
                $('.dropify').dropify();

                // Translated
                $('.dropify-fr').dropify({
                    messages: {
                        default: 'Please click to upload the fundus image',
                        replace: 'Click to upload a replacement image again',
                        remove:  'Delete',
                        error:   'Image error'
                    }
                });

                // Used events
                var drEvent = $('#input-file-events').dropify();

                drEvent.on('dropify.beforeClear', function(event, element){
                    return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
                });

                drEvent.on('dropify.afterClear', function(event, element){
                    alert('File deleted');
                });

                drEvent.on('dropify.errors', function(event, element){
                    console.log('Has Errors');
                });

                var drDestroy = $('#input-file-to-destroy').dropify();
                drDestroy = drDestroy.data('dropify')
                $('#toggleDropify').on('click', function(e){
                    e.preventDefault();
                    if (drDestroy.isDropified()) {
                        drDestroy.destroy();
                    } else {
                        drDestroy.init();
                    }
                })
            });
