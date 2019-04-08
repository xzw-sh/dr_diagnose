function zoom(mask, bigimg, smallimg) {
    this.bigimg = bigimg;
    this.smallimg = smallimg;
    this.mask = mask
}
zoom.prototype = {
    init: function () {
        var that = this;
        this.smallimgClick();
        this.maskClick();
        this.mouseWheel();
        this.height = $("." + that.smallimg).height() * 1.0;
        this.width =  $("." + that.smallimg).width() * 1.0;
    },
    smallimgClick: function () {
        var that = this;
        // console.log('smallimg',this.smallimg);
        
        $("." + 'imgbox').click(function () {
            console.log('click');
            $("." + that.bigimg).css({
                height: $("." + that.smallimg).height() * 1.0,
                width: $("." + that.smallimg).width() * 1.0
            });
            $("." + that.mask).fadeIn();
            $("." + that.bigimg).attr("src", $("." + that.smallimg).attr("src")).fadeIn()
        })
    },
    maskClick: function () {
        var that = this;
        $("." + that.mask).click(function () {
            $("." + that.bigimg).fadeOut();
            $("." + that.mask).fadeOut()
        })
    },
    mouseWheel: function () {
        function mousewheel(obj, upfun, downfun) {
            if (document.attachEvent) {
                obj.attachEvent("onmousewheel", scrollFn)
            } else {
                if (document.addEventListener) {
                    obj.addEventListener("mousewheel", scrollFn, false);
                    obj.addEventListener("DOMMouseScroll", scrollFn, false)
                }
            }

            function scrollFn(e) {
                var ev = e || window.event;
                console.log(ev.wheelDelta || ev.detail);
                var dir = ev.wheelDelta || ev.detail;
                if (ev.preventDefault) {
                    ev.preventDefault()
                } else {
                    ev.returnValue = false
                }
                if (dir == -3 || dir == -5 ||dir == 120) {
                    console.log('up');
                    upfun()
                } else {
                    console.log('down');
                    downfun()
                }
            }
        }
        var that = this;
        mousewheel($("." + that.bigimg)[0], function () {
            console.log('放大');
            if ($("." + that.bigimg).innerWidth() > $("body").width() - 20 || $("." + that.bigimg).innerHeight() > $("body").height() + 150) {
                alert("不能再放大了");
                return
            }
            // if ($("." + that.bigimg).innerHeight() > $("body").height() + 150) {
            //     alert("不能再放大");
            //     return
            // }
            console.log($("." + that.bigimg).innerHeight()*1.13);
            // console.log($("." + that.bigimg).innerWidth());
            var zoomHeight = $("." + that.bigimg).innerHeight() * 1.13;
            var zoomWidth = $("." + that.bigimg).innerWidth() * 1.23;
            $("." + that.bigimg).css({
                height: zoomHeight + "px",
                width: zoomWidth + "px"
            })
        }, function () {
            console.log('缩小');
            if($("." + that.bigimg).innerWidth() < that.width){
                $("." + that.bigimg).css({
                    width: that.width + "px"
                })
            }
            if($("." + that.bigimg).innerHeight() < that.height){
                $("." + that.bigimg).css({
                    height: that.height + "px"
                })
            }
            // if ($("." + that.bigimg).innerWidth() < that.width || $("." + that.bigimg).innerHeight() < that.height) {
            //     alert("不能再缩小了哦！");
            //     return
            // }
            // if ($("." + that.bigimg).innerHeight() < that.height) {
            //     alert("不能再缩小了哦！");
            //     return
            // }
            var zoomHeight = $("." + that.bigimg).innerHeight() / 1.13;
            var zoomWidth = $("." + that.bigimg).innerWidth() / 1.23;
            $("." + that.bigimg).css({
                height: zoomHeight + "px",
                width: zoomWidth + "px"
            })
        })
    }
};