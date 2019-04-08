/*========================================================*/
/* Light Loader
/*========================================================*/
var loopFlag = false;
var lightLoader = function(c, cw, ch) {

	var _this = this;
	this.c = c;
	this.ctx = c.getContext('2d');
	this.cw = cw;
	this.ch = ch;

	this.loaded = 0;
	this.loaderSpeed = 1.2;
	this.loaderHeight = 10;
	this.loaderWidth = 310;
	this.loader = {
		x: (this.cw / 2) - (this.loaderWidth / 2),
		y: (this.ch / 2) - (this.loaderHeight / 2)
	};
	this.particles = [];
	this.particleLift = 180;
	this.hueStart = 0
	this.hueEnd = 120;
	this.hue = 0;
	this.gravity = .15;
	this.particleRate = 4;

	/*========================================================*/
	/* Initialize
	/*========================================================*/
	this.init = function() {
		this.loop();
	};

	/*========================================================*/
	/* Utility Functions
	/*========================================================*/
	this.rand = function(rMi, rMa) {
		return ~~((Math.random() * (rMa - rMi + 1)) + rMi);
	};
	this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2) {
		return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
	};

	/*========================================================*/
	/* Update Loader
	/*========================================================*/
	this.updateLoader = function() {
		var el = document.getElementById("main");
		var temp = document.getElementById("leida");
		// var outTime = document.getElementById("outTime");


		if (this.loaded < 100) {
			if (this.loaded > 59 && this.loaded < 78) {
				if (!loopFlag) {
					this.loaded += 0.1;
				} else {
					this.loaded += this.loaderSpeed;
				}
			} else if (this.loaded > 85 && this.loaded < 95) {
				if (!loopFlag) {
					this.loaded += 0.04;
				} else {
					this.loaded += this.loaderSpeed;
				}
			} else if (this.loaded >= 95 && this.loaded < 99) {
				if (!loopFlag) {
					this.loaded += 0.008;
				} else {
					this.loaded += this.loaderSpeed;
				}
			} else {
				this.loaded += this.loaderSpeed;
			}
			// el.className="col-md-3 " + "col-sm-3 " + "wrapper";
			// 	el.style.display = "none";
			// temp.style.display = 'block';
		} else {
			c.style.display = 'none';
			// 
			if (!loopFlag) {
				// el.style.display = 'block';
				// temp.style.display = 'none';
				// outTime.innerHTML = "<h2>请求超时，请稍后再试。</h2>";
			}

			// alert('请求超时，请稍后在试。')

			// alert(el);
			// el.className ="col-md-3 " + "col-sm-3 " + "wrapper";
			// el.style.display = "block";
		}
	};

	/*========================================================*/
	/* Render Loader
	/*========================================================*/
	this.renderLoader = function() {
		this.ctx.fillStyle = '#000';
		this.ctx.fillRect(this.loader.x, this.loader.y, this.loaderWidth, this.loaderHeight);

		this.hue = this.hueStart + (this.loaded / 100) * (this.hueEnd - this.hueStart);

		var newWidth = (this.loaded / 100) * this.loaderWidth;
		this.ctx.fillStyle = 'hsla(' + this.hue + ', 100%, 40%, 1)';
		this.ctx.fillRect(this.loader.x, this.loader.y, newWidth, this.loaderHeight);

		this.ctx.fillStyle = '#222';
		this.ctx.fillRect(this.loader.x, this.loader.y, newWidth, this.loaderHeight / 2);
	};

	/*========================================================*/
	/* Particles
	/*========================================================*/
	this.Particle = function() {
		this.x = _this.loader.x + ((_this.loaded / 100) * _this.loaderWidth) - _this.rand(0, 1);
		this.y = _this.ch / 2 + _this.rand(0, _this.loaderHeight) - _this.loaderHeight / 2;
		this.vx = (_this.rand(0, 4) - 2) / 100;
		this.vy = (_this.rand(0, _this.particleLift) - _this.particleLift * 2) / 100;
		this.width = _this.rand(1, 4) / 2;
		this.height = _this.rand(1, 4) / 2;
		this.hue = _this.hue;
	};

	this.Particle.prototype.update = function(i) {
		this.vx += (_this.rand(0, 6) - 3) / 100;
		this.vy += _this.gravity;
		this.x += this.vx;
		this.y += this.vy;

		if (this.y > _this.ch) {
			_this.particles.splice(i, 1);
		}
	};

	this.Particle.prototype.render = function() {
		_this.ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + _this.rand(50, 70) + '%, ' + _this.rand(20, 100) / 100 + ')';
		_this.ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	this.createParticles = function() {
		var i = this.particleRate;
		while (i--) {
			this.particles.push(new this.Particle());
		};
	};

	this.updateParticles = function() {
		var i = this.particles.length;
		while (i--) {
			var p = this.particles[i];
			p.update(i);
		};
	};

	this.renderParticles = function() {
		var i = this.particles.length;
		while (i--) {
			var p = this.particles[i];
			p.render();
		};
	};

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	/*========================================================*/
	/* Clear Canvas
	/*========================================================*/
	this.clearCanvas = function() {
		this.ctx.globalCompositeOperation = 'source-over';
		this.ctx.clearRect(0, 0, this.cw, this.ch);
		this.ctx.globalCompositeOperation = 'lighter';
	};

	/*========================================================*/
	/* Animation Loop
	/*========================================================*/
	this.loop = function() {
		var loopIt = function() {
			requestAnimationFrame(loopIt, _this.c);


			_this.clearCanvas();

			_this.createParticles();

			_this.updateLoader();
			_this.updateParticles();

			_this.renderLoader();
			_this.renderParticles();

		};
		loopIt();
	};

};

/*========================================================*/
/* Check Canvas Support
/*========================================================*/
var isCanvasSupported = function() {
	var elem = document.createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
};

/*========================================================*/
/* Setup requestAnimationFrame
/*========================================================*/
var setupRAF = function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	};

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	};

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	};
};

/*========================================================*/
/* Define Canvas and Initialize
/*========================================================*/
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function inputChange(target) {
    // console.log(target.files[0]);
    let imgName = document.getElementById('img-name');
    let tempName = '';
	var fileSize = 0;
	if (!target.files) {
		var filePath = target.value;
		var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
		var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
        tempName = file.name;
	} else {
        fileSize = target.files[0].size;
        tempName = target.files[0].name;
	}
	var size = fileSize / 1024;
	if (size > 1024) {
		alert("Please upload images below 1M!");
		target.value = "";
		return
	}else {
        imgName.innerHTML = tempName;
    }
}

var c;

function submitBtn() {
	var image_file = document.getElementById("input-file-french-2").files[0];
	// console.log(image_file);
	if (image_file == undefined) {
		alert('Please upload a fundus image!');
	} else {
		var temp = document.getElementById("leida");
        var el = document.getElementById("main");
        var jt =document.getElementById("jiantou");
		var resultCd = document.getElementById("result-cd");
		var resultJy = document.getElementById("result-jy");
		var resultTable = document.getElementById("result-table");
		var tableBtn = document.getElementById("table-btn");
		// var title = document.getElementById("title");
		var resultTime = document.getElementById("result-time");

		// title.style.display = "none";
		tableBtn.innerHTML = "View lesion details";
		$("#result-cd").removeClass('result-cd');
		el.style.display = "none";
		jt.style.display = "none";
		temp.style.display = 'block';
		//var image_file = $('input-file-french-2');

		c = document.createElement('canvas');
		c.setAttribute('class', 'flight');
		c.width = 400;
		c.height = 100;
		c.style.display = "block";
		var cw = c.width;
		var ch = c.height;
		document.body.appendChild(c);
		var cl = new lightLoader(c, cw, ch);
		cl.loaded = 0;
		loopFlag = false;
		setupRAF();
		cl.init();
	}


	var reader = new FileReader();
	reader.readAsDataURL(image_file);

	reader.onload = function(e) { // reader onload start
			// ajax 上传图片
			// 测试加载条速度变化
			// setTimeout(() => {
			//   loopFlag = true;
			//   alert("loopFlag= "+ loopFlag);
			//            alert(ele.value);
			$.ajax({
				type: 'POST',
				url: "tangniaobing",
				data: {
					"name": image_file.name,
					'image': e.target.result
				},
				dataType: 'json',
				timeout: 18000,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					if (XMLHttpRequest.status == 408 || textStatus == 'timeout' || textStatus == 'error') {
						alert('Request timed out, please try again later');
						temp.style.display = 'none';
						c.style.display = 'none';
					}
				},
				success: function(ret, err) {
					// var ret ={
					//     result : 1
					// };
					if (ret) {
						console.log(ret.result);
						el.style.display = "block";
						jt.style.display = "block";
						resultTime.innerHTML = new Date().Format("yyyy-MM-dd HH:mm:ss");

						switch (ret.result) {
							case "0":
								resultCd.innerHTML = "No DR";
								resultJy.innerHTML = "Your retina has not yet developed lesions. Please continue to maintain healthy living habits and check regularly.";
								resultTable.style.display = "none";
								tableBtn.style.display = "none";
								break;
							case "1":
								resultCd.innerHTML = "Mild";
								resultJy.innerHTML = "Your retina is currently in a primary lesion. Please go to the hospital for further diagnosis and check, usually pay attention to diet and control blood sugar.";
								$("#result-cd").addClass('result-cd');
								tableBtn.style.display = 'inline';
								break;
							case "2":
								resultCd.innerHTML = "Moderate";
								resultJy.innerHTML = "Your retina is currently in a secondary lesion. Please go to the hospital for further diagnosis and check, usually pay attention to diet and control blood sugar. Properly cooperate with medication.";
								$("#result-cd").addClass('result-cd');
								tableBtn.style.display = 'inline';

								break;
							case "3":
								resultCd.innerHTML = "Severe";
								resultJy.innerHTML = "Your retina is currently in a tertiary lesion. Please go to the hospital for further diagnosis and examination, usually pay attention to diet health, please pay attention to diet, strict control of blood sugar, with medication.";
								$("#result-cd").addClass('result-cd');
								tableBtn.style.display = 'inline';

								break;
							case "4":
								resultCd.innerHTML = "Proliferative DR";
								resultJy.innerHTML = "Your retina may have developed proliferative lesions. It is recommended to go to the hospital for further diagnosis, perform a comprehensive dilated test, and cooperate with a doctor.";
								$("#result-cd").addClass('result-cd');
								tableBtn.style.display = 'inline';

								break;
							default:
								break;
						}
						loopFlag = true;
						temp.style.display = 'none';
					} else {
						temp.style.display = 'none';
						// alert(JSON.stringify(err));
						alert("Network Error");
					}
				}
			});
			// 	$.post("lesion_grade", {
			// 			img: e.target.result
			// 		},
			// 		function(ret, err) {
			// 			// var ret ={
			// 			//     result : 1
			// 			// };
			// 			if (ret) {
			// 				console.log(ret.result);
			// 				el.style.display = "block";
			// 				// title.style.display = "block";
			// 				resultTime.innerHTML = new Date().Format("yyyy-MM-dd HH:mm:ss");

			// 				switch (ret.result) {
			// 					case "0":
			// 						resultCd.innerHTML = "未发生病变";
			// 						resultJy.innerHTML = "您的视网膜尚未发生病变,请继续保持健康生活习惯，定期检查。";
			// 						resultTable.style.display = "none";
			// 						tableBtn.style.display = "none";
			// 						break;
			// 					case "1":
			// 						resultCd.innerHTML = "轻微病变";
			// 						resultJy.innerHTML = "您的视网膜目前处于病变一级。请到医院做进一步的确诊检查，平时注意饮食健康，控制血糖。";
			// 						$("#result-cd").addClass('result-cd');
			// 						tableBtn.style.display = 'inline';
			// 						break;
			// 					case "2":
			// 						resultCd.innerHTML = "中度病变";
			// 						resultJy.innerHTML = "您的视网膜目前处于病变二级。请到医院做进一步的确诊检查，平时注意饮食健康，控制血糖。适当配合药物治疗。";
			// 						$("#result-cd").addClass('result-cd');
			// 						tableBtn.style.display = 'inline';

			// 						break;
			// 					case "3":
			// 						resultCd.innerHTML = "严重病变";
			// 						resultJy.innerHTML = "您的视网膜目前处于病变三级。请到医院做进一步的确诊检查，平时注意饮食健康，请注意饮食讲究，严格控制血糖，配合药物治疗。";
			// 						$("#result-cd").addClass('result-cd');
			// 						tableBtn.style.display = 'inline';

			// 						break;
			// 					case "4":
			// 						resultCd.innerHTML = "增生性病变";
			// 						resultJy.innerHTML = "您的视网膜尚可能已发生增生性病变,建议立即到医院做进一步的确诊检查,进行全面散瞳检测，并配合医生进行治疗。";
			// 						$("#result-cd").addClass('result-cd');
			// 						tableBtn.style.display = 'inline';

			// 						break;
			// 					default:
			// 						break;
			// 				}
			// 				loopFlag = true;
			// 				temp.style.display = 'none';
			// 			} else {
			// 				temp.style.display = 'none';
			// 				// alert(JSON.stringify(err));
			// 				alert("网咯错误");
			// 			}
			//
			// 			// if(ret.result == "0"){
			// 			//     //alert('upload success' + ret.img);
			// 			//     //$('#showimg').html('<img src="' + ret.img + '">');
			// 			//      el.innerHTML = "眼睛状态良好，请继续保持。";
			// 			//     loopFlag = true ;
			// 			//     temp.style.display = 'none';
			// 			//     el.className ="col-md-3 " + "col-sm-3 " + "wrapper";
			// 			//     el.style.display = "block";

			// 			//    }else{
			// 			//     //alert('upload fail');
			// 			//    var display = "眼睛患有一级糖网病变，请尽快治疗。";
			// 			//    if (ret.result == "1") {
			// 			//       display = "眼睛患有一级糖网病变，请尽快治疗。";
			// 			//    } else if (ret.result == "2") {
			// 			//        display = "眼睛患有二级糖网病变，请尽快治疗。";
			// 			//    } else if (ret.result == "3") {
			// 			//        display = "眼睛患有三级糖网病变，请尽快治疗。";
			// 			//    } else if (ret.result == "4") {
			// 			//        display = "眼睛患有四级糖网病变，请尽快治疗。";
			// 			//    }

			// 			//    el.innerHTML = display
			// 			//    loopFlag = true ;
			// 			//    temp.style.display = 'none';
			// 			//    el.className ="col-md-3 " + "col-sm-3 " + "wrapper";
			// 			//    el.style.display = "block";
			// 			// }
			// 			// }, 3000);

			// 		}, 'json');
		} // reader onload end

	//    if(isCanvasSupported){
	//  	//   var el = document.getElementById("main");
	//  	//   el.className="col-md-4";
	//	  // el.style.display = "none";
	// c = document.createElement('canvas');
	// c.setAttribute('class','flight');
	// c.width = 400;
	// c.height = 100;
	// c.style.display="block";
	// var cw = c.width;
	// var ch = c.height;
	// document.body.appendChild(c);
	// var cl = new lightLoader(c, cw, ch);
	// setupRAF();
	// cl.init();
	// }



	//var reader = new FileReader();
	//var fileInput = $('input-file-french-2"')
	//reader.readAsDataURL(fileInput.files[0]);
	//reader.onload = function(e){
	//console.log(e.target.result);
	//$('#file_base64').val(e.target.result);
	//};
	// }
}