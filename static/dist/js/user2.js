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

 // 彩色星空背景
 
 $(function(){
       var canvas = document.querySelector('canvas'),
           ctx = canvas.getContext('2d');
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       //显得宽度为0.3
       ctx.lineWidth = 0.3;
       //生成随机的颜色
       ctx.strokeStyle = (new Color(150)).style;

       var mousePosition = {
         //初始化鼠标位置点，不明白为啥不直接写/2
         x: 50 * canvas.width / 100,
         y: 50 * canvas.height / 100
       };

       var dots = {
         //点的个数
         nb: 250,
         //两点间最大距离的平方除以2再开方，就是就是一个筛选值
         distance: 100,
         //鼠标有效半径
         d_radius: 150,
         //小球数组
         array: []
       };

     //rgb的色值介于0-255之间
       function colorValue(min) {
         return Math.floor(Math.random() * 255 + min);
       }

       function createColorStyle(r,g,b) {
         return 'rgba(' + r + ',' + g + ',' + b + ', 0.9)';
       }

       //此处高能开始，一开始以为只是去两个颜色的中间值，没想到连直径的比例也加上去了
       function mixComponents(comp1, weight1, comp2, weight2) {
         return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
       }

     //用于返回连线的颜色
       function averageColorStyles(dot1, dot2) {
         //获取两点的颜色
         var color1 = dot1.color,
             color2 = dot2.color;

         var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
             g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
             b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
         return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
       }

     //随机颜色生成器，这个写的挺神的
       function Color(min) {
         min = min || 0;
         this.r = colorValue(min);
         this.g = colorValue(min);
         this.b = colorValue(min);
         this.style = createColorStyle(this.r, this.g, this.b);
       }

     //生成一个点
       function Dot(){
         //点产生在页面的随机位置处
         this.x = Math.random() * canvas.width;
         this.y = Math.random() * canvas.height;
           //设定x和y轴的运动速度
         this.vx = -.5 + Math.random();
         this.vy = -.5 + Math.random();
         //直径大小，也是随机的
         this.radius = Math.random() * 2;
         //随机的颜色
         this.color = new Color();
         // console.log(this);
       }

     //原型上加绘制函数
       Dot.prototype = {
         //绘制小点的方法
         draw: function(){
           ctx.beginPath();
           ctx.fillStyle = this.color.style;
           ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
           ctx.fill();
         }
       };

     //创建了一个点的集合
       function createDots(){
         for(i = 0; i < dots.nb; i++){
           dots.array.push(new Dot());
         }
       }

     //碰撞检测函数
       function moveDots() {
         for(i = 0; i < dots.nb; i++){

           var dot = dots.array[i];

           if(dot.y < 0 || dot.y > canvas.height){
             dot.vx = dot.vx;
             dot.vy = - dot.vy;
           }
           else if(dot.x < 0 || dot.x > canvas.width){
             dot.vx = - dot.vx;
             dot.vy = dot.vy;
           }
           dot.x += dot.vx;
           dot.y += dot.vy;
         }
       }

     // 遍历点的数组，将满足的条件的两个点进行连线
       function connectDots() {
         for(i = 0; i < dots.nb; i++){
           for(j = 0; j < dots.nb; j++){
             i_dot = dots.array[i];
             j_dot = dots.array[j];
             //假设当前点距离和遍历的点的距离小于所定义的半径长度（其实为distance的平方乘以二再开方，三角函数），这两个判断到时大家可以重新研究一下谁在上谁在下，以做到算法最优化
             if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
               //用来筛选处于鼠标所在点设定值半径内的所欲点
               if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                 ctx.beginPath();
                 //之前最好奇的就是线的渐变是怎么做的，看完顿时感觉，很高能
                 ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                 ctx.moveTo(i_dot.x, i_dot.y);
                 ctx.lineTo(j_dot.x, j_dot.y);
                 ctx.stroke();
                 ctx.closePath();
               }
             }
           }
         }
       }

     //数组中的所有小球，进行绘制
       function drawDots() {
         for(i = 0; i < dots.nb; i++){
           var dot = dots.array[i];
           dot.draw();
         }
       }

     //比定时器更加准确，跟着浏览器的渲染频率走
       function animateDots() {
         //清空画布,并且重新绘制，然后执行定时器，循环绘制
         ctx.clearRect(0, 0, canvas.width, canvas.height);

         moveDots();

         connectDots();

         drawDots();

         requestAnimationFrame(animateDots);
       }


     //鼠标移除，再次将默认位置重置为中心区域
       $('canvas').on('mouseleave', function(e){
         mousePosition.x = canvas.width / 2;
         mousePosition.y = canvas.height / 2;
       });

       // 创建点集合
       createDots();
       //其实用定时器是一样的，准确率差不了多少，估计作者想使用新技术，又或是本身是一个强迫症患者
       requestAnimationFrame(animateDots);
     });

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
