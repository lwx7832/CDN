/*
2020-3-24
修改切换线路同时打开播放链接
优化播放页线路切换弹出
优化固定广告位
修改底飘iframe为embed标签

2020-2-15
添加手机端播放页搜索

2020-2-12
修改电脑端播放页列表样式-到播放器左侧
修改手机端播放页列表样式-弹出式切换播放源
详情页添加播放源
*/
var yyob = {
	browser: {
		url: document.URL,
		domain: document.domain,
		title: document.title,
		urlpath: document.location.pathname,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 === a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	mobile: {
		share: function(){
		$(".open-share").click(function(){
			$(".am-share").addClass("am-modal-active");	
			if($(".sharebg").length>0){
				$(".sharebg").addClass("sharebg-active");
			}else{
				$("body").append('<div class="sharebg"></div>');
				$(".sharebg").addClass("sharebg-active");
			}
			$(".sharebg-active,.share_btn").click(function(){
				$(".am-share").removeClass("am-modal-active");	
				setTimeout(function(){
					$(".sharebg-active").removeClass("sharebg-active");	
					$(".sharebg").remove();	
				},300);
			})
	    })
		},
		sharewx: function(){
		$(".open-sharewx").click(function(){
			$(".am-sharewx").addClass("am-modal-activewx");	
			if($(".sharebgwx").length>0){
				$(".sharebgwx").addClass("sharebg-activewx");
			}else{
				$("body").append('<div class="sharebgwx"></div>');
				$(".sharebgwx").addClass("sharebg-activewx");
			}
			$(".sharebg-activewx,.share_btnwx").click(function(){
				$(".am-sharewx").removeClass("am-modal-activewx");	
				setTimeout(function(){
					$(".sharebg-activewx").removeClass("sharebg-activewx");	
					$(".sharebgwx").remove();	
				},300);
			})
	    })
		},
		xiaoshuo: function() {
			yyob.browser.useragent.weixin ? $("#xiao").after('<li><a rel="nofollow" href="#" target="_blank">小说</a></li>') : $("#xiao").after()
		}
	},
	swiper: function() {
		//$.getScript(maccms.path + "/template/yyob/js/swiper.min.js", function() {
			$.getScript("https://cdn.staticfile.org/Swiper/3.4.2/js/swiper.min.js", function() {
				var swiper = new Swiper('.banner-top', {
					autoplay: 5000,
					autoplayDisableOnInteraction : false,
					speed: 1000,
					loop: true,
					slidesPerView: 5,
					centeredSlides: true,
					mousewheelControl : true,
					prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
					lazyLoading : true,
					lazyLoadingInPrevNext : true,
					runCallbacksOnInit : false,
					onInit:function() {
						setTimeout(function () {
							var Bgimgurl = $(".banner-top .swiper-slide-active a").css("backgroundImage").replace('url(','').replace(')','');
						    document.getElementById("bgimage").style.backgroundImage="url("+Bgimgurl+")";
						},1500);
					},
					onSlideChangeStart: function() {
                       	var Bgimgurl = $(".banner-top .swiper-slide-active a").css("backgroundImage").replace('url(','').replace(')','');
						document.getElementById("bgimage").style.backgroundImage="url("+Bgimgurl+")";
                    },
					breakpoints: {
                       1024: {
                          slidesPerView: 4.6,
                       },
					   820: {
                          slidesPerView: 2.5, 
                       },
                    }
				});
			    var swiper = new Swiper('.banner-wtop', {
					autoplay: 5000,
					autoplayDisableOnInteraction : false,
					loop: true,
					prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
					pagination: '.swiper-pagination',
					paginationClickable: true,
					onInit:function() {
						setTimeout(function () {
							$.adaptiveBackground.run()	
						},1500);
					},
				});
				var swiper = new Swiper('.art_banner', {
					autoplay: 5000,
					autoplayDisableOnInteraction : false,
					spaceBetween: 1,
                    speed: 1000,
					slidesPerView: 1,
					loop: true,
					prevButton: '.swiper-button-prev',
                    nextButton: '.swiper-button-next',
					pagination: '.swiper-pagination',
					paginationClickable: true,
					lazyLoading : true,
					lazyLoadingInPrevNext : true,
				});
		});
	},
	menu: function(){
		var windowWidth = $(window).width();
		if (windowWidth < 820) {
			$(".menu").click(function(){
				$('html,body').addClass("overhidden");
				$(".all_menu").addClass("menu_block");
				$(".close_menu").click(function(){
					$('html,body').removeClass("overhidden");
					$(".all_menu").removeClass("menu_block");	
				});
			});
		}else{
			$(".head_menu_b").each(function(s){
				$(this).hover(
					function(){
						$(".all_menu").eq(s).show();
					},
					function(){
						$(".all_menu").eq(s).hide();
					})
			})
		}
	},
	fixed: function(){
		if(window.location.hash){
			var targetScroll = $(window.location.hash).offset().top - 80;
			$("html,body").animate({scrollTop:targetScroll},300);
		};
		$(window).scroll(function(){
			var $this = $(this);
			var targetTop = $(this).scrollTop();
			var height = $(window).height();
			if (targetTop >= 50){
				$("#topnav,.listnow,.art_navlist").addClass("nav_fixed");
			}else{
				$("#topnav,.listnow,.art_navlist").removeClass("nav_fixed");
			}
		});
		$(window).scroll(function(){
			var $this = $(this);
			var targetTop = $(this).scrollTop();
			var height = $(window).height();
			if (targetTop >= 1200){
				$(".ads_rbox").addClass("adfixed");
			}else{
				$(".ads_rbox").removeClass("adfixed");
			}
		})
    },
	Search: function() {
		$("input.form_control").focus(function(){
			$(".submit").addClass("search_btn");	
		});
		$("input.form_control").blur(function(){
			$(".submit").removeClass("search_btn");
		});
	},
	wrapper: function() {
		var windowWidth = $(window).width();
		if (windowWidth < 820) {
		//$.getScript(maccms.path + "/template/yyob/js/iscroll.js", function() {
		$.getScript("https://cdn.staticfile.org/iScroll/5.2.0/iscroll.js", function() {	
		   $(".wrapper").navbarscroll()
		   $('#yyob01').navbarscroll({SelectName:'.yyob-n-01'});
		   $('#yyob02').navbarscroll({SelectName:'.yyob-n-02'});
		   $('#yyob03').navbarscroll({SelectName:'.yyob-n-03'});
		   $('#yyob04').navbarscroll({SelectName:'.yyob-n-04'});
		   $('#yyob05').navbarscroll({SelectName:'.yyob-n-05'});
		   $('#yyob06').navbarscroll({SelectName:'.yyob-n-06'});
		})
		}
	},
	flip: function(){
		$(".flip").click(function(){
			$(".panel").slideToggle("slow");
			$(".xs1").toggle();
			$(".xs2").toggle();
		});
    },
	closebtn: function(){
		$(".close_ads_btn").click(function(){
			$("#bottom_ads").remove();
			$(".foot").removeClass("foot_stem");
		});
		$(".close_tips").click(function(){
			$("#fd_tips").remove();
		});
	},
	shorturl: function(){
		var short = $("#short");
		var short2 = $("#short2");
		var url2 = "https://api.uomg.com/api/long2fh?dwzapi=urlcn&url=";
		//var app_key = $("#app_key").val();
		var shareurl = $("#shareurl").val();
		if (shareurl=="") {
			var cmd2 = url2 + "long2dwz?dwzapi=urlcn&url=" + encodeURIComponent(yyob.browser.url);
		}else{
            var cmd2 = url2 + "long2dwz?dwzapi=urlcn&url=" + shareurl + encodeURIComponent(yyob.browser.urlpath);
		}

		$.ajax({
			url: cmd2,
			type: "GET",
			dataType: "json", 
			cache: false,
			success: function (code, status) {
				short.append( code.ae_url);
				short2.append( code.ae_url);
			}
		});
		//console.log(short);
	},
	/*	shorturl: function(){
		var short = $("#short");
		var short2 = $("#short2");
		var url2 = "https://api.weibo.com/2/short_url/shorten.json";
		var app_key = $("#app_key").val();
		var shareurl = $("#shareurl").val();
		if (shareurl=="") {
			var cmd2 = url2 + "?source=" + app_key + "&url_long=" + encodeURIComponent(yyob.browser.url);
		}else{
            var cmd2 = url2 + "?source=" + app_key + "&url_long=" + shareurl + encodeURIComponent(yyob.browser.urlpath);
		}
		$.ajax({
			url: cmd2,
			type: "GET",
			dataType: "jsonp", 
			cache: false,
			success: function (data, status) {
				for(x in data.data.urls[0]) ;
				short.append( data.data.urls[0].url_short);
				short2.append( data.data.urls[0].url_short);
			}
		});
	},*/
	images: {
		lazyload: function() {
			//$.getScript(maccms.path + "/template/yyob/js/jquery.lazyload.min.js", function() {
			$.getScript("https://cdn.staticfile.org/jquery_lazyload/1.9.3/jquery.lazyload.min.js", function() {
				$(".lazyload").lazyload({
					effect: "fadeIn", //淡入效果
					threshold: 200, //图片在距离屏幕 200 像素时提前加载.
					failurelimit: 20,
				});
				var windowWidth = $(window).width();
				if (windowWidth < 820) {
					$(".list_scroll .vodlist_thumb").removeClass("lazyload");
					$(".list_scroll .vodlist_thumb").addClass("boxload");
					$(".boxload").lazyload({
						effect: "fadeIn",
						threshold: 150,
						failurelimit: 5,
						container: $(".vodlist_sm,.vodlist_sh")
					});
				}
			})
		},
		qrcode: function() {
			//$.getScript(maccms.path + "/template/yyob/js/jquery.qrcode.min.js", function() {
			$.getScript("https://cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min.js", function() {
				$(".cans").qrcode({
					width:120,
					height:120,
					text:encodeURI(yyob.browser.url)
				});  
				function convertCanvasToImage(canvas) {  
					var image = new Image();  
					image.src = canvas.toDataURL("image/png");  
					return image;  
				}   
				var mycans=$('canvas')[0];   
				var img=convertCanvasToImage(mycans);  
				$('.qrcode').append(img); 
			})			
		}
	},
	scrolltop: function() {
		var a = $(window);
		$scrollTopLink = $("a.backtop");
		a.scroll(function() {
			500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none")
		});
		$scrollTopLink.on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 400);
			return !1
		})
	},
	copy: function() {
		//$.getScript(maccms.path + "/template/yyob/js/clipboard.min.js", function() {
		$.getScript("https://cdn.staticfile.org/clipboard.js/1.7.1/clipboard.min.js", function() {
			var btn=document.getElementsByClassName('copy_btn');
			var clipboard=new Clipboard(btn);
			clipboard.on('success', function(e){
				$('#show').slideDown().delay(1500).slideUp(300);
				console.log(e);
			});
			clipboard.on('error', function(e){
				$('#show').slideDown().delay(1500).slideUp(300);
				console.log(e);
			});
		})
	},
/*	copywx: function() {
		//$.getScript(maccms.path + "/template/yyob/js/clipboard.min.js", function() {
		$.getScript("https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js", function() {
			var btn=document.getElementsByClassName('copy_btnwx');
			var clipboard=new Clipboard(btn);
			clipboard.on('success', function(e){
				$('#showwx').slideDown().delay(5000).slideUp(1000);
				console.log(e);
			});
			clipboard.on('error', function(e){
				$('#showwx').slideDown().delay(5000).slideUp(1000);
				console.log(e);
			});
		})
	},*/
	wxqrcode: function() {
		var wx_name = $("#wx_name").val();
		var site_wxewmtext = $("#site_wxewmtext").val();
		var wx_qrcode = $("#wx_qrcode").val();
		var zans_qrcode = $("#zans_qrcode").val();
		$(".btn_wxgzh").click(function() {
            $("body").append('<div class="acos_wrap"><div class="mac_pop_bg"></div><div class="yyob_content"><div class="yyob_content_hd"><h4 class="yyob_content_title">关注后微信观看</h4></div><div class="yyob_content_bd"><img class="info_img" src="https://ae01.alicdn.com/kf/Ua57fe6b525a741199c3c849f679ef888y.jpg" alt="公众号二维码"><p>长按识别二维码或微信扫码关注</p><p>关注后回复片名即可</p><p>或微信搜索微信名：<span style="color: #f44336;">天赐娱乐网<span></span></span></p></div><div class="yyob_content_ft"><a class="close_box" href="javascript:;">下次再说</a></div></div></div>');
			$(".close_box,.mac_pop_bg").click(function() {
				$(".acos_wrap").remove();
		    });
		});
		$(".btn_zhans").click(function() {
            $("body").append('<div class="acos_wrap"><div class="mac_pop_bg"></div><div class="yyob_content"><div class="yyob_content_hd"><h4 class="yyob_content_title">感谢赞赏</h4></div><div class="yyob_content_bd"><img class="info_img" src="https://tva1.sinaimg.cn/large/007X8olVly1g8d52463woj30gh0gh0xi.jpg" alt="赞赏二维码"><br><p>长按识别二维码或微信扫描二维码</p><p>金额随意，多少都是支持</p></div><div class="yyob_content_ft"><a class="acos_btn_no" href="javascript:;">残忍拒绝</a><a class="close_box" href="javascript:;">取消</a></div></div></div>');
			$(".acos_btn_no").click(function() {
				alert("就知道你会点，哼~，不过还要祝你观影愉快～！")
				$(".acos_wrap").remove();
			});
			$(".close_box,.mac_pop_bg").click(function() {
				$(".acos_wrap").remove();
		    });
		});
	},
	'Sort': function() {
		$(".sort_btn").each(function(){
			$(this).on("click",function(e){
				e.preventDefault();
				$(this).parent().parent().parent().find(".content_playlist").each(function(){
				    var playlist=$(this).find("li");
				    for(let i=0,j=playlist.length-1;i<j;){
				        var l=playlist.eq(i).clone(true);
				        var r=playlist.eq(j).replaceWith(l);
				        playlist.eq(i).replaceWith(r);
				        ++i;
				        --j;
				    }
				});
			});
		});	
	},
	'tab': function() {
			$(".tab li").on('click',function(){
			    $(".tab li.active").removeClass('active')
			    $(this).addClass('active')
			    var index = $(this).index()
				$(".tab-content .item").eq(index).addClass('active').siblings().removeClass('active');
	  		})

		  	$(".play-tab li").on('click',function(){
			    $(".play-tab li.active").removeClass('active')
			    $(this).addClass('active')
			    var index = $(this).index()
			    $(this).parent().parent().find("h3").html($(".play-tab li.active").html())
				$(".play-content .play-item").eq(index).addClass('active').siblings().removeClass('active');
				$(".play-tab").hide()			
	  		})
		  	$(".play-switch").on('click',function(){
		  		$(".play-tab").toggle()
		  	})
	
		},
	'tabm': function() {
			$(".tabm li").on('click',function(){
			    $(".tabm li.active").removeClass('active')
			    $(this).addClass('active')
			    var index = $(this).index()
				$(".tab-contentm .item").eq(index).addClass('active').siblings().removeClass('active');
	  		})

		  	$(".play-tabm li").on('click',function(){
			    $(".play-tabm li.active").removeClass('active')
			    $(this).addClass('active')
			    var index = $(this).index()
			    $(this).parent().parent().parent().next().find("b").html($(".play-tabm li.active").html())
				$(".play-contentm .play_list_box").eq(index).addClass('show').siblings().removeClass('show');
				$(".play-tabm").hide()			
	  		})
		  	$(".play-switchm").on('click',function(){
		  		$(".play-tabm").toggle()
		  	})
	
		},	
	'Shows':{
		'Text': function() {
			showdiv = function(obj) {
				var x = obj.parentNode;
				var y = x.nextSibling;
				if (y.nodeType !== 1) {
					y = y.nextSibling;
				}
				y.style.display = "block";
				x.style.display = "none";
			}

			hidediv = function(obj) {
				var y = obj.parentNode;
				var x = y.previousSibling;
				if (x.nodeType !== 1) {
					x = x.previousSibling;
				}
				y.style.display = "none";
				x.style.display = "block";
			}
			$.each($(".context span"), function (i) {
				if ($('.context span').eq(i).height() > 50) {
					$('.context span').eq(i).next().css('display', 'block');
				} else {
					$('.context span').eq(i).next().css('display', 'none');
				}
			});
		},
		'List': function() {
			showlist = function() {
				$('.playlist_notfull,.listshow').css('display', 'none');
				$('.playlist_full').css('display', 'block');
			};
			hidelist = function() {
				$('.playlist_notfull').css('display', 'block');
				$('.playlist_full').css('display', 'none');
			};
			$.each($("#playlistbox li"), function () {
				var Lnum = document.getElementById('playlistbox').getElementsByTagName("li").length;
				var W = $(window).width();
				if (W < 820) {
					$('.playlist_full').css('display', 'none');
					if (Lnum > 4) {
						$('.showbtn').css('display', 'block');
					}else{
						$('.showbtn').css('display', 'none');
					}
				}else{
					if (Lnum > 24) {
						$('.playlist_full').css('display', 'none');
					}else{
						$('.playlist_notfull,.listshow').css('display', 'none');
						$('.playlist_full').css('display', 'block');
					}
				}
			});

		}

	 },
	fanliqrcode: function() {
		var wx_name = $("#wx_name").val();
		var site_wxewmtext = $("#site_wxewmtext").val();
		var wx_qrcode = $("#wx_qrcode").val();
		var zans_qrcode = $("#zans_qrcode").val();
		$(".btn_fanli").click(function() {
			$("body").append('<div class="acos_wrap"><div class="mac_pop_bg"></div><div class="yyob_content_fanli"><div class="yyob_content_hd"></div><div class="yyob_content_bd"><img class="info_img_fanli" src="https://tva1.sinaimg.cn/large/007X8olVly1g7wwh536x5j30m80xbn0j.jpg" alt="公众号二维码"></div><div class="yyob_content_ft"><a class="close_box" href="javascript:;">下次再说</a></div></div></div>');
			$(".close_box,.mac_pop_bg").click(function() {
				$(".acos_wrap").remove();
		    });
		});
	}
};
$(document).ready(function() {
	yyob.browser.useragent.mobile && (yyob.mobile.share(), yyob.mobile.sharewx(), yyob.mobile.xiaoshuo());
	yyob.swiper();
	yyob.menu();
	yyob.fixed();
	yyob.Search();
	yyob.wrapper();
	yyob.flip();
	yyob.closebtn();
	yyob.shorturl();
	yyob.images.lazyload();
	yyob.images.qrcode();
	yyob.scrolltop();
	yyob.copy();
//	yyob.copywx();
	yyob.wxqrcode();
	yyob.Sort();
	yyob.tab();
	yyob.tabm();
	yyob.Shows.Text();
	yyob.Shows.List();
	yyob.fanliqrcode();
});

if ($('.v_change').length) {
    var divs = [];
    var divCnt = 3;
    for (var i = 0; i < divCnt; i++) {
        divs[i] = $(".cbox" + (i + 1))
    }
    ;var selectedDiv = 0;
    $('.v_change').on('click', function() {
        selectedDiv++;
        selectedDiv = selectedDiv % divCnt;
        for (var i = 0; i < divCnt; i++) {
            $(this).closest('.pannel', '.cbox_list').find(divs[i]).removeClass('show fadeIn').addClass('hide fadeOut')
        }
        $(this).closest('.pannel', '.cbox_list').find(divs[selectedDiv]).removeClass('hide fadeOut').addClass('show fadeIn');

    })
};

//懒加载图片遇到tab栏切换要手动滚动一下才能加载
$('.v_change').on('click', function (e) {
    $(window).trigger('scroll');//触发下绑定窗口的滚动事件重新计算
});


//弹出式切换播放源
$(document).ready(function(){
  $(".win-xuanji").click(function(){
	$(".popXuanji").addClass("popWinMask_transition");
	$(".popXuanji .playSource_popWin").addClass("popWin_transition");
	$("body").addClass("modal-open");	
  });
});	
$(document).ready(function(){
  $(".hdwrap").click(function(){
	$(".popXianlu").addClass("popWinMask_transition");
	$(".popXianlu .playSource_popWin").addClass("popWin_transition");
	$("body").addClass("modal-open");	
  });
});	
$(document).ready(function(){
  $(".hide_popWin").click(function(){
	$(".popWinMask").removeClass("popWinMask_transition");
	$(".playSource_popWin").removeClass("popWin_transition");
	$("body").removeClass("modal-open");
  });
});	

$(document).ready(function() {
    $(".popXuanji li").bind("click", function() {
        var e = $(this).index(),
            a = $(".num-tab > div");
			b = $(".pSource > span");
			c = $(".popXuanji");
			d = $(".popXuanji .playSource_popWin");
			h = $("body");
        $(this).removeClass().addClass("show").siblings().removeClass();
		a.removeClass("show").animate({opacity: '0'},100);
        a.eq(e).addClass("show").animate({opacity: '1'},100);
		b.removeClass("show");
        b.eq(e).addClass("show");
        c.removeClass("popWinMask_transition");
        d.removeClass("popWin_transition");
		h.removeClass("modal-open");
    })
});
$(document).ready(function() {
    $(".popXianlu li").bind("click", function() {
        var e = $(this).index(),
			c = $(".popXianlu");
			d = $(".popXianlu .playSource_popWin");
			h = $("body");
        $(this).removeClass().addClass("show").siblings().removeClass();
        c.removeClass("popWinMask_transition");
        d.removeClass("popWin_transition");
		h.removeClass("modal-open");
    })
});

if (document.domain != 'j8dy.com' && document.domain != 'www.j8dy.com'){  
window.location.href='https://www.j8dy.com/';  
}

console.log('%c电影客 www.j8dy.com', 'font-size:2em');
console.log('%c好电影不需要VIP！', 'font-size:1.5em;color:#a00000');
console.log('%c页面加载完毕消耗了' + Math.round(performance.now() * 100) / 100 + 'ms', 'background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');