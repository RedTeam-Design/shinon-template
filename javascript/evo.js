;
(function ($, v, A, B) {
	var C = (function (u) {
		return function () {
			return u.search(arguments[0])
		}
	})((navigator && navigator.userAgent) ? navigator.userAgent.toLowerCase() : "");
	var D = ($.browser.msie && parseInt($.browser.version, 10) < 7 && parseInt($.browser.version, 10) > 4);
	var E = false;
	if (C("mobile") > -1) {
		if (C("android") > -1 || C("googletv") > -1 || C("htc_flyer") > -1) {
			E = true
		}
	};
	if (C("opera") > -1) {
		if (C("mini") > -1 && C("mobi") > -1) {
			E = true
		}
	};
	if (C("iphone") > -1) {
		E = true
	};
	if (C("windows phone os 7") > -1) {
		E = true
	};
	if ($.proxy === B) {
		var F = {};
		$.each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object"], function (i, a) {
			F["[object " + a + "]"] = a.toLowerCase()
		});
		$.extend({
			proxy: function (a, b) {
				if (a) {
					return function () {
						return a.apply(b || this, arguments)
					}
				}
			},
			type: function (a) {
				return a === null ? String(a) : F[Object.prototype.toString.call(a)] || "object"
			},
			parseJSON: function (a) {
				if (typeof a !== "string" || !a) {
					return null
				}
				a = $.trim(a);
				if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
					return v.JSON && v.JSON.parse ? v.JSON.parse(a) : (new Function("return " + a))()
				} else {
					alert("Invalid JSON: " + a)
				}
			}
		})
	};
	$.extend($.fx.prototype, {
		update: function () {
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this)
			} ($.fx.step[this.prop] || $.fx.step._default)(this)
		}
	});
	$.extend($.easing, {
		easeOutBack: function (x, t, b, c, d, s) {
			if (s === B) s = 1.70158;
			return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
		}
	});
	$.extend({
		LightBoxObject: {
			defaults: {
				name: 'jquery-lightbox',
				style: {
					zIndex: 99999,
					width: 470,
					height: 280
				},
				modal: false,
				overlay: {
					opacity: 0.6
				},
				animation: {
					show: {
						duration: 400,
						easing: "easeOutBack"
					},
					close: {
						duration: 200,
						easing: "easeOutBack"
					},
					move: {
						duration: 800,
						easing: "easeOutBack"
					},
					shake: {
						duration: 100,
						easing: "easeOutBack",
						distance: 10,
						loops: 2
					}
				},
				flash: {
					width: 640,
					height: 360
				},
				iframe: {
					width: 640,
					height: 360
				},
				maxsize: {
					width: -1,
					height: -1
				},
				emergefrom: "top",
				ajax: {
					type: "GET",
					cache: false,
					dataType: "html"
				}
			},
			options: {},
			animations: {},
			gallery: {},
			image: {},
			esqueleto: {
				lightbox: [],
				buttons: {
					close: [],
					prev: [],
					max: [],
					next: []
				},
				background: [],
				image: [],
				title: [],
				html: []
			},
			matchedlnks: [],
			visible: false,
			maximized: false,
			mode: "image",
			videoregs: {
				swf: {
					reg: /[^\.]\.(swf)\s*$/i
				},
				youtube: {
					reg: /youtube\.com\/watch/i,
					split: '=',
					index: 1,
					iframe: 1,
					url: "http://www.youtube.com/embed/%?autoplay=1&amp;fs=1&amp;rel=0&amp;enablejsapi=1"
				},
				youtu: {
					reg: /youtu\.be\//i,
					split: '/',
					index: 3,
					iframe: 1,
					url: "http://www.youtube.com/embed/%?autoplay=1&amp;fs=1&amp;rel=0&amp;enablejsapi=1"
				},
				metacafe: {
					reg: /metacafe\.com\/watch/i,
					split: '/',
					index: 4,
					url: "http://www.metacafe.com/fplayer/%/.swf?playerVars=autoPlay=yes"
				},
				dailymotion: {
					reg: /dailymotion\.com\/video/i,
					split: '/',
					index: 4,
					url: "http://www.dailymotion.com/swf/video/%?additionalInfos=0&amp;autoStart=1"
				},
				google: {
					reg: /google\.com\/videoplay/i,
					split: '=',
					index: 1,
					url: "http://video.google.com/googleplayer.swf?autoplay=1&amp;hl=en&amp;docId=%"
				},
				vimeo: {
					reg: /vimeo\.com/i,
					split: '/',
					index: 3,
					iframe: 1,
					url: "http://player.vimeo.com/video/%?hd=1&amp;autoplay=1&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1"
				},
				gametrailers: {
					reg: /gametrailers\.com/i,
					split: '/',
					index: 5,
					url: "http://www.gametrailers.com/remote_wrap.php?mid=%"
				},
				collegehumornew: {
					reg: /collegehumor\.com\/video\//i,
					split: 'video/',
					index: 1,
					url: "http://www.collegehumor.com/moogaloop/moogaloop.jukebox.swf?autostart=true&amp;fullscreen=1&amp;use_node_id=true&amp;clip_id=%"
				},
				collegehumor: {
					reg: /collegehumor\.com\/video:/i,
					split: 'video:',
					index: 1,
					url: "http://www.collegehumor.com/moogaloop/moogaloop.swf?autoplay=true&amp;fullscreen=1&amp;clip_id=%"
				},
				ustream: {
					reg: /ustream\.tv/i,
					split: '/',
					index: 4,
					url: "http://www.ustream.tv/flash/video/%?loc=/&amp;autoplay=true&amp;vid=%&amp;disabledComment=true&amp;beginPercent=0.5331&amp;endPercent=0.6292&amp;locale=en_US"
				},
				twitvid: {
					reg: /twitvid\.com/i,
					split: '/',
					index: 3,
					url: "http://www.twitvid.com/player/%"
				},
				wordpress: {
					reg: /v\.wordpress\.com/i,
					split: '/',
					index: 3,
					url: "http://s0.videopress.com/player.swf?guid=%&amp;v=1.01"
				},
				vzaar: {
					reg: /vzaar\.com\/videos/i,
					split: '/',
					index: 4,
					url: "http://view.vzaar.com/%.flashplayer?autoplay=true&amp;border=none"
				}
			},
			mapsreg: {
				bing: {
					reg: /bing\.com\/maps/i,
					split: '?',
					index: 1,
					url: "http://www.bing.com/maps/embed/?emid=3ede2bc8-227d-8fec-d84a-00b6ff19b1cb&amp;w=%width%&amp;h=%height%&amp;%"
				},
				streetview: {
					reg: /maps\.google\.com(.*)layer=c/i,
					split: '?',
					index: 1,
					url: "http://maps.google.com/?output=svembed&amp;%"
				},
				googlev2: {
					reg: /maps\.google\.com\/maps\/ms/i,
					split: '?',
					index: 1,
					url: "http://maps.google.com/maps/ms?output=embed&amp;%"
				},
				google: {
					reg: /maps\.google\.com/i,
					split: '?',
					index: 1,
					url: "http://maps.google.com/maps?%&amp;output=embed"
				}
			},
			imgsreg: /\.(jpg|jpeg|gif|png|bmp|tiff)(.*)?$/i,
			overlay: {
				create: function (a) {
					this.options = a;
					this.element = $('<div id="' + new Date().getTime() + '" class="' + this.options.name + '-overlay"></div>');
					this.element.css($.extend({},
					{
						'position': 'fixed',
						'top': 0,
						'left': 0,
						'opacity': 0,
						'display': 'none',
						'z-index': this.options.zIndex
					},
					this.options.style));
					this.element.click($.proxy(function (e) {
						if (!this.options.modal) {
							if ($.isFunction(this.options.callback)) {
								this.options.callback()
							} else {
								this.hide()
							}
						}
						e.preventDefault()
					},
					this));
					this.hidden = true;
					this.inject();
					return this
				},
				inject: function () {
					this.target = $(A.body);
					this.target.append(this.element);
					if (D) {
						this.element.css('position', 'absolute');
						var a = parseInt(this.element.css('zIndex'), 10);
						if (!a) {
							a = 1;
							var b = this.element.css('position');
							if (b === 'static' || !b) {
								this.element.css('position', 'relative')
							}
							this.element.css('zIndex', a)
						}
						a = ( !! (this.options.zIndex || this.options.zIndex === 0) && a > this.options.zIndex) ? this.options.zIndex: a - 1;
						if (a < 0) {
							a = 1
						}
						this.shim = $('<iframe id="IF_' + new Date().getTime() + '" scrolling="no" frameborder=0 src=""></iframe>');
						this.shim.css({
							zIndex: a,
							position: 'absolute',
							top: 0,
							left: 0,
							border: 'none',
							width: 0,
							height: 0,
							opacity: 0
						});
						this.shim.insertAfter(this.element);
						$('html, body').css({
							'height': '100%',
							'width': '100%',
							'margin-left': 0,
							'margin-right': 0
						})
					}
				},
				resize: function (x, y) {
					this.element.css({
						'height': 0,
						'width': 0
					});
					if (this.shim) {
						this.shim.css({
							'height': 0,
							'width': 0
						})
					};
					var a = {
						x: $(A).width(),
						y: $(A).height()
					};
					this.element.css({
						'width': '100%',
						'height': y || a.y
					});
					if (this.shim) {
						this.shim.css({
							'height': 0,
							'width': 0
						});
						this.shim.css({
							'position': 'absolute',
							'left': 0,
							'top': 0,
							'width': this.element.width(),
							'height': y || a.y
						})
					}
					return this
				},
				show: function (a) {
					if (!this.hidden) {
						return this
					};
					if (this.transition) {
						this.transition.stop()
					};
					if (this.shim) {
						this.shim.css('display', 'block')
					};
					this.element.css({
						'display': 'block',
						'opacity': 0
					});
					this.target.bind('resize', $.proxy(this.resize, this));
					this.resize();
					this.hidden = false;
					this.transition = this.element.fadeTo(this.options.showDuration, this.options.style.opacity, $.proxy(function () {
						if (this.options.style.opacity) {
							this.element.css(this.options.style)
						};
						this.element.trigger('show');
						if ($.isFunction(a)) {
							a()
						}
					},
					this));
					return this
				},
				hide: function (a) {
					if (this.hidden) {
						return this
					};
					if (this.transition) {
						this.transition.stop()
					};
					if (this.shim) {
						this.shim.css('display', 'none')
					};
					this.target.unbind('resize');
					this.hidden = true;
					this.transition = this.element.fadeTo(this.options.closeDuration, 0, $.proxy(function () {
						this.element.trigger('hide');
						if ($.isFunction(a)) {
							a()
						};
						this.element.css({
							'height': 0,
							'width': 0,
							'display': 'none'
						})
					},
					this));
					return this
				}
			},
			create: function (a) {
				this.options = $.extend(true, this.defaults, a);
				var b = this.options.name;
				var c = $('<div class="' + b + ' ' + b + '-mode-image"><div class="' + b + '-border-top-left"></div><div class="' + b + '-border-top-middle"></div><div class="' + b + '-border-top-right"></div><a class="' + b + '-button-close" href="#close"><span>Close</span></a><div class="' + b + '-navigator"><a class="' + b + '-button-left" href="#"><span>Previous</span></a><a class="' + b + '-button-right" href="#"><span>Next</span></a></div><div class="' + b + '-buttons"><div class="' + b + '-buttons-init"></div><a class="' + b + '-button-left" href="#"><span>Previous</span></a><a class="' + b + '-button-max" href="#"><span>Maximize</span></a><div class="' + b + '-buttons-custom"></div><a class="' + b + '-button-right" href="#"><span>Next</span></a><div class="' + b + '-buttons-end"></div></div><div class="' + b + '-background"></div><div class="' + b + '-html"></div><div class="' + b + '-border-bottom-left"></div><div class="' + b + '-border-bottom-middle"></div><div class="' + b + '-border-bottom-right"></div></div>');
				var e = this.esqueleto;
				this.overlay.create({
					name: b,
					style: this.options.overlay,
					modal: this.options.modal,
					zIndex: this.options.style.zIndex - 1,
					callback: this.proxy(this.close),
					showDuration: (E ? 2 : this.options.animation.show.duration),
					closeDuration: (E ? 2 : this.options.animation.close.duration)
				});
				e.lightbox = c;
				e.navigator = $('.' + b + '-navigator', c);
				e.buttons.div = $('.' + b + '-buttons', c);
				e.buttons.close = $('.' + b + '-button-close', c);
				e.buttons.prev = $('.' + b + '-button-left', c);
				e.buttons.max = $('.' + b + '-button-max', c);
				e.buttons.next = $('.' + b + '-button-right', c);
				e.buttons.custom = $('.' + b + '-buttons-custom', c);
				e.background = $('.' + b + '-background', c);
				e.html = $('.' + b + '-html', c);
				e.move = $('<div class="' + b + '-move"></div>').css({
					'position': 'absolute',
					'z-index': this.options.style.zIndex,
					'top': -999
				}).append(c);
				$('body').append(e.move);
				this.win = $(v);
				this.addevents();
				return c
			},
			addevents: function () {
				var a = this.win;
				a[0].onorientationchange = function () {
					a.trigger('resize')
				};
				a.bind('resize', this.proxy(function () {
					if (this.visible) {
						this.overlay.resize();
						if (!this.maximized) {
							this.movebox()
						}
					}
				}));
				a.bind('scroll', this.proxy(function () {
					if (this.visible && !this.maximized) {
						this.movebox()
					}
				}));
				$(A).bind('keydown', this.proxy(function (e) {
					if (this.visible) {
						if (e.keyCode === 27 && this.options.modal === false) {
							this.close()
						}
						if (this.gallery.total > 1) {
							if (e.keyCode === 37) {
								this.esqueleto.buttons.prev.triggerHandler('click', e)
							}
							if (e.keyCode === 39) {
								this.esqueleto.buttons.next.triggerHandler('click', e)
							}
						}
					}
				}));
				this.esqueleto.buttons.close.bind('click touchend', {
					"fn": "close"
				},
				this.proxy(this.fn));
				this.esqueleto.buttons.max.bind('click touchend', {
					"fn": "maximinimize"
				},
				this.proxy(this.fn));
				this.overlay.element.bind('show', this.proxy(function () {
					$(this).triggerHandler('show')
				}));
				this.overlay.element.bind('hide', this.proxy(function () {
					$(this).triggerHandler('close')
				}))
			},
			fn: function (e) {
				this[e.data.fn].apply(this);
				e.preventDefault()
			},
			proxy: function (a) {
				return $.proxy(a, this)
			},
			ex: function (d, f, g) {
				var h = {
					type: "",
					width: "",
					height: "",
					href: ""
				};
				$.each(d, this.proxy(function (b, c) {
					$.each(c, this.proxy(function (i, e) {
						if ((b == "flash" && f.split('?')[0].match(e.reg)) || (b == "iframe" && f.match(e.reg))) {
							h.href = f;
							if (e.split) {
								var a = b == "flash" ? f.split(e.split)[e.index].split('?')[0].split('&')[0] : f.split(e.split)[e.index];
								h.href = e.url.replace("%", a).replace("%width%", g.width).replace("%height%", g.height)
							}
							h.type = e.iframe ? "iframe": b;
							h.width = g.width || this.options[h.type].width;
							h.height = g.height || this.options[h.type].height;
							return false
						}
					}));
					if ( !! h.type) return false
				}));
				return h
			},
			create_gallery: function (a, b) {
				var c = this.esqueleto.buttons.prev;
				var d = this.esqueleto.buttons.next;
				this.gallery.total = a.length;
				if (a.length > 1) {
					c.unbind('.lightbox');
					d.unbind('.lightbox');
					c.bind('click.lightbox touchend.lightbox', this.proxy(function (e) {
						e.preventDefault();
						a.unshift(a.pop());
						this.show(a)
					}));
					d.bind('click.lightbox touchend.lightbox', this.proxy(function (e) {
						e.preventDefault();
						a.push(a.shift());
						this.show(a)
					}));
					if (this.esqueleto.navigator.css("display") === "none") {
						this.esqueleto.buttons.div.show()
					}
					c.show();
					d.show()
				} else {
					c.hide();
					d.hide()
				}
			},
			custombuttons: function (c, d) {
				var f = this.esqueleto;
				f.buttons.custom.empty();
				$.each(c, this.proxy(function (i, a) {
					var b = $('<a href="#" class="' + a['class'] + '">' + a['html'] + '</a>');
					b.bind('click', this.proxy(function (e) {
						if ($.isFunction(a.callback)) {
							a.callback(this.esqueleto.image.src, this, d)
						}
						e.preventDefault()
					}));
					f.buttons.custom.append(b)
				}));
				f.buttons.div.show()
			},
			show: function (d, f, g) {
				if (this.utils.isEmpty(d)) {
					return false
				}
				var h = d[0];
				var i = '';
				var j = false;
				var k = h.href;
				var l = this.esqueleto;
				var m = {
					x: this.win.width(),
					y: this.win.height()
				};
				var n, height;
				if (d.length === 1 && h.type === "element") {
					i = "element"
				}
				this.loading();
				j = this.visible;
				this.open();
				if (j === false) {
					this.movebox()
				}
				this.create_gallery(d, f);
				f = $.extend(true, {
					'width': 0,
					'height': 0,
					'modal': 0,
					'force': '',
					'autoresize': true,
					'move': -1,
					'iframe': false,
					'flashvars': '',
					'cufon': true,
					'onOpen': function () {},
					'onClose': function () {}
				},
				f || {},
				h);
				this.options.onOpen = f.onOpen;
				this.options.onClose = f.onClose;
				this.options.cufon = f.cufon;
				var o = this.unserialize(k);
				f = $.extend({},
				f, o);
				if (f.width && ("" + f.width).indexOf("p") > 0) {
					f.width = (m.x - 20) * f.width.substring(0, f.width.indexOf("p")) / 100
				}
				if (f.height && ("" + f.height).indexOf("p") > 0) {
					f.height = (m.y - 20) * f.height.substring(0, f.height.indexOf("p")) / 100
				}
				this.overlay.options.modal = f.modal;
				l.buttons.max.removeClass(this.options.name + '-button-min').addClass(this.options.name + '-button-max');
				this.maximized = !(f.move > 0 || (f.move == -1 && f.autoresize));
				if ($.isArray(f.buttons)) {
					this.custombuttons(f.buttons, h.element)
				}
				if (this.esqueleto.buttons.custom.is(":empty") === false) {
					this.esqueleto.buttons.div.show()
				}
				l.buttons.max.hide();
				if (this.utils.isEmpty(f.force) === false) {
					i = f.force
				} else if (f.iframe) {
					i = 'iframe'
				} else if (k.match(this.imgsreg)) {
					i = 'image'
				} else {
					var p = this.ex({
						"flash": this.videoregs,
						"iframe": this.mapsreg
					},
					k, f);
					if ( !! p.type === true) {
						k = p.href;
						i = p.type;
						f.width = p.width;
						f.height = p.height
					}
					if ( !! i === false) {
						if (k.match(/#/)) {
							var q = k.substr(k.indexOf("#"));
							if ($(q).length > 0) {
								i = 'inline';
								k = q
							} else {
								i = 'ajax'
							}
						} else {
							i = 'ajax'
						}
					}
				}
				if (i === 'image') {
					l.image = new Image();
					$(l.image).load(this.proxy(function () {
						var a = this.esqueleto.image;
						$(a).unbind('load');
						if (this.visible === false) {
							return false
						}
						if (f.width) {
							n = parseInt(f.width, 10);
							height = parseInt(f.height, 10)
						} else {
							if (f.autoresize) {
								var b = this.calculate(a.width, a.height);
								n = b.width;
								height = b.height;
								if (a.width != n || a.height != height) {
									this.esqueleto.buttons.div.show();
									this.esqueleto.buttons.max.show()
								}
							} else {
								n = a.width;
								height = a.height
							}
						}
						this.esqueleto.title = (this.utils.isEmpty(f.title)) ? false: $('<div class="' + this.options.name + '-title"></div>').html(f.title);
						this.loadimage();
						this.resize(n, height)
					}));
					this.esqueleto.image.onerror = this.proxy(function () {
						this.error("The requested image cannot be loaded. Please try again later.")
					});
					this.esqueleto.image.src = k
				} else if (i == 'flash' || i == 'inline' || i == 'ajax' || i == 'element') {
					if (i == 'inline') {
						var r = $(k);
						var s = r.clone(true).show();
						n = f.width > 0 ? f.width: r.outerWidth(true);
						height = f.height > 0 ? f.height: r.outerHeight(true);
						this.appendhtml(s, n, height)
					} else if (i == 'ajax') {
						if (f.width) {
							n = f.width;
							height = f.height
						} else {
							this.error("You have to specify the size. Add ?lightbox[width]=600&lightbox[height]=400 at the end of the url.");
							return false
						}
						if (this.animations.ajax) {
							this.animations.ajax.abort()
						}
						this.animations.ajax = $.ajax($.extend({},
						this.options.ajax, {
							url: k,
							error: this.proxy(function (a, b, c) {
								this.error("AJAX Error " + a.status + " " + c)
							}),
							success: this.proxy(function (a) {
								this.appendhtml($(a), n, height)
							})
						}))
					} else if (i == 'flash') {
						var t = this.swf2html(k, f.width, f.height, f.flashvars);
						this.appendhtml($(t), f.width, f.height, 'flash')
					} else if (i === 'element') {
						n = f.width > 0 ? f.width: h.element.outerWidth(true);
						height = f.height > 0 ? f.height: h.element.outerHeight(true);
						this.appendhtml(h.element, n, height)
					}
				} else if (i == 'iframe') {
					if (f.width) {
						n = f.width;
						height = f.height
					} else {
						this.error("You have to specify the size. Add ?lightbox[width]=600&lightbox[height]=400&lighbox[iframe]=true at the end of the url.");
						return false
					}
					var u = '<iframe id="IF_' + (new Date().getTime()) + '" frameborder="0" src="' + k + '" style="margin:0; padding:0;"></iframe>';
					this.appendhtml($(u).css({
						width: f.width,
						height: f.height
					}), f.width, f.height)
				}
				this.callback = $.isFunction(g) ? g: function (e) {}
			},
			loadimage: function () {
				var a = this.esqueleto;
				var b = a.background;
				var c = this.options.name + '-loading';
				b.bind('complete', this.proxy(function () {
					b.unbind('complete');
					if (this.visible === false) {
						return false
					}
					this.changemode('image');
					b.empty();
					a.html.empty();
					if (a.title) {
						b.append(a.title)
					}
					b.append(a.image);
					if (D || E) {
						b.removeClass(c)
					} else {
						$(a.image).css("background-color", "rgba(255, 255, 255, 0)");
						$(a.image).stop().css("opacity", 0).animate({
							"opacity": 1
						},
						400, function () {
							b.removeClass(c)
						})
					}
					this.options.onOpen.apply(this)
				}))
			},
			swf2html: function (a, b, c, d) {
				if (typeof d == 'undefined' || d == '') d = 'autostart=1&autoplay=1&fullscreenbutton=1';
				var e = '<object width="' + b + '" height="' + c + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name="movie" value="' + a + '" style="margin:0; padding:0;"></param>';
				e += '<param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param>';
				e += '<param name="autostart" value="true"></param><param name="autoplay" value="true"></param><param name="flashvars" value="' + d + '"></param>';
				e += '<param name="width" value="' + b + '"></param><param name="height" value="' + c + '"></param>';
				e += '<embed src="' + a + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" autostart="true" autoplay="true" flashvars="' + d + '" wmode="transparent" width="' + b + '" height="' + c + '" style="margin:0; padding:0;"></embed></object>';
				return e
			},
			appendhtml: function (a, b, c, d) {
				var e = this.esqueleto;
				var f = e.background;
				this.changemode("html");
				this.resize(b + 30, c + 20);
				f.bind('complete', this.proxy(function () {
					f.removeClass(this.options.name + '-loading');
					e.html.append(a);
					if (d == "flash" && C("chrome") > -1) {
						this.esqueleto.html.html(a)
					}
					f.unbind('complete');
					if (this.options.cufon && typeof Cufon !== 'undefined') {
						Cufon.refresh()
					}
					this.options.onOpen.apply(this)
				}))
			},
			movebox: function (w, h) {
				var a = {
					x: $(this.win).width(),
					y: $(this.win).height()
				};
				var b = {
					x: $(this.win).scrollLeft(),
					y: $(this.win).scrollTop()
				};
				var c = this.esqueleto;
				var d = h != null ? h: c.lightbox.outerHeight();
				var e = w != null ? w: c.lightbox.outerWidth();
				var y = 0;
				var x = 0;
				x = b.x + ((a.x - e) / 2);
				if (this.visible) {
					y = b.y + (a.y - d) / 2
				} else if (this.options.emergefrom == "bottom") {
					y = (b.y + a.y + 14)
				} else if (this.options.emergefrom == "top") {
					y = (b.y - d) - 14
				}
				if (this.visible) {
					if (!this.animations.move) {
						this.morph(c.move, {
							'left': x
						},
						'move')
					}
					this.morph(c.move, {
						'top': y
					},
					'move')
				} else {
					c.move.css({
						'left': x,
						'top': y
					})
				}
			},
			morph: function (d, f, g, h, i) {
				var j = $.speed({
					queue: i || false,
					duration: (E ? 2 : this.options.animation[g].duration),
					easing: this.options.animation[g].easing,
					complete: ($.isFunction(h) ? this.proxy(h, this) : null)
				});
				return d[j.queue === false ? "each": "queue"](function () {
					if (parseFloat($.fn.jquery) > 1.5) {
						if (j.queue === false) {
							$._mark(this)
						}
					}
					var c = $.extend({},
					j),
					self = this;
					c.curAnim = $.extend({},
					f);
					c.animatedProperties = {};
					for (var p in f) {
						name = p;
						c.animatedProperties[name] = c.specialEasing && c.specialEasing[name] || c.easing || 'swing'
					}
					$.each(f, function (a, b) {
						var e = new $.fx(self, c, a);
						e.custom(e.cur(true) || 0, b, "px")
					});
					return true
				})
			},
			resize: function (x, y) {
				var a = this.esqueleto;
				if (this.visible) {
					var b = {
						x: $(this.win).width(),
						y: $(this.win).height()
					};
					var c = {
						x: $(this.win).scrollLeft(),
						y: $(this.win).scrollTop()
					};
					var d = (c.x + (b.x - (x + 14)) / 2);
					var e = (c.y + (b.y - (y + 14)) / 2);
					if ($.browser.msie || ($.browser.mozilla && (parseFloat($.browser.version) < 1.9))) {
						y += 4
					}
					this.animations.move = true;
					this.morph(a.move.stop(), {
						'left': (this.maximized && d < 0) ? 0 : d,
						'top': (this.maximized && (y + 14) > b.y) ? c.y: e
					},
					'move', $.proxy(function () {
						this.move = false
					},
					this.animations));
					this.morph(a.html, {
						'height': y - 20
					},
					'move');
					this.morph(a.lightbox.stop(), {
						'width': (x + 14),
						'height': y - 20
					},
					'move', {},
					true);
					this.morph(a.navigator, {
						'width': x
					},
					'move');
					this.morph(a.navigator, {
						'top': (y - 90) / 2
					},
					'move');
					this.morph(a.background.stop(), {
						'width': x,
						'height': y
					},
					'move', function () {
						$(a.background).trigger('complete')
					})
				} else {
					a.html.css({
						'height': y - 20
					});
					a.lightbox.css({
						'width': x + 14,
						'height': y - 20
					});
					a.background.css({
						'width': x,
						'height': y
					});
					a.navigator.css({
						'width': x,
						'height': 90
					})
				}
			},
			close: function (a) {
				var b = this.esqueleto;
				this.visible = false;
				this.gallery = {};
				this.options.onClose();
				if ($.browser.msie || E) {
					b.background.empty();
					b.html.hide().empty().show();
					b.buttons.custom.empty();
					b.move.css("display", "none");
					this.movebox()
				} else {
					b.move.animate({
						"opacity": 0,
						"top": "-=40"
					},
					{
						queue: false,
						complete: (this.proxy(function () {
							b.background.empty();
							b.html.empty();
							b.buttons.custom.empty();
							this.movebox();
							b.move.css({
								"display": "none",
								"opacity": 1,
								"overflow": "visible"
							})
						}))
					})
				}
				this.overlay.hide(this.proxy(function () {
					if ($.isFunction(this.callback)) {
						this.callback.apply(this, $.makeArray(a))
					}
				}));
				b.background.stop(true, false).unbind("complete")
			},
			open: function () {
				this.visible = true;
				if ($.browser.msie) {
					this.esqueleto.move.get(0).style.removeAttribute("filter")
				}
				this.esqueleto.move.stop().css({
					opacity: 1,
					display: "block",
					overflow: "visible"
				}).show();
				this.overlay.show()
			},
			shake: function () {
				var z = this.options.animation.shake;
				var x = z.distance;
				var d = z.duration;
				var t = z.transition;
				var o = z.loops;
				var l = this.esqueleto.move.position().left;
				var e = this.esqueleto.move;
				for (var i = 0; i < o; i++) {
					e.animate({
						left: l + x
					},
					d, t);
					e.animate({
						left: l - x
					},
					d, t)
				};
				e.animate({
					left: l + x
				},
				d, t);
				e.animate({
					left: l
				},
				d, t)
			},
			changemode: function (a) {
				if (a != this.mode) {
					var b = this.options.name + "-mode-";
					this.esqueleto.lightbox.removeClass(b + this.mode).addClass(b + a);
					this.mode = a
				}
				this.esqueleto.move.css("overflow", "visible")
			},
			error: function (a) {
				alert(a);
				this.close()
			},
			unserialize: function (d) {
				var e = /lightbox\[([^\]]*)?\]$/i;
				var f = {};
				if (d.match(/#/)) {
					d = d.slice(0, d.indexOf("#"))
				}
				d = d.slice(d.indexOf('?') + 1).split("&");
				$.each(d, function () {
					var a = this.split("=");
					var b = a[0];
					var c = a[1];
					if (b.match(e)) {
						if (isFinite(c)) {
							c = parseInt(c, 10)
						} else if (c.toLowerCase() == "true") {
							c = true
						} else if (c.toLowerCase() == "false") {
							c = false
						}
						f[b.match(e)[1]] = c
					}
				});
				return f
			},
			calculate: function (x, y) {
				var a = this.options.maxsize.width > 0 ? this.options.maxsize.width: this.win.width() - 50;
				var b = this.options.maxsize.height > 0 ? this.options.maxsize.height: this.win.height() - 50;
				if (x > a) {
					y = y * (a / x);
					x = a;
					if (y > b) {
						x = x * (b / y);
						y = b
					}
				} else if (y > b) {
					x = x * (b / y);
					y = b;
					if (x > a) {
						y = y * (a / x);
						x = a
					}
				}
				return {
					width: parseInt(x, 10),
					height: parseInt(y, 10)
				}
			},
			loading: function () {
				var a = this.options.style;
				var b = this.esqueleto.background;
				this.changemode('image');
				b.children().stop(true);
				b.empty();
				this.esqueleto.html.empty();
				b.addClass(this.options.name + '-loading');
				this.esqueleto.buttons.div.hide();
				if (this.visible == false) {
					this.movebox(a["width"], a["height"]);
					this.resize(a["width"], a["height"])
				}
			},
			maximinimize: function () {
				var a = this.esqueleto.buttons;
				var b = this.esqueleto.image;
				var c = this.options.name;
				if (this.maximized) {
					this.maximized = false;
					a.max.removeClass(c + '-button-min').addClass(c + '-button-max');
					this.loading();
					this.loadimage();
					a.div.show();
					var d = this.calculate(b.width, b.height);
					this.resize(d.width, d.height)
				} else {
					this.maximized = true;
					a.max.removeClass(c + '-button-max').addClass(c + '-button-min');
					this.loading();
					this.loadimage();
					a.div.show();
					this.resize(b.width, b.height)
				}
			},
			getOptions: function (a) {
				var a = $(a);
				return $.extend({},
				{
					href: a.attr("href"),
					rel: ($.trim(a.attr("data-rel") || a.attr("rel"))),
					relent: a.attr("data-rel") ? "data-rel": "rel",
					title: $.trim(a.attr("data-title") || a.attr("title")),
					element: a[0]
				},
				$.parseJSON(a.attr("data-options")))
			},
			link: function (b, c) {
				var d = $(c.element);
				var e = this.getOptions(d);
				var f = e.rel;
				var g = e.relent;
				var h = c.options;
				var j = [];
				d.blur();
				if (c.gallery) {
					j = c.gallery
				} else if (this.utils.isEmpty(f) || f === 'nofollow') {
					j = [e]
				} else {
					var k = [];
					var l = [];
					var m = false;
					$("a[" + g + "], area[" + g + "]", this.ownerDocument).filter("[" + g + "=\"" + f + "\"]").each($.proxy(function (i, a) {
						if (d[0] === a) {
							k.unshift(this.getOptions(a));
							m = true
						} else if (m == false) {
							l.push(this.getOptions(a))
						} else {
							k.push(this.getOptions(a))
						}
					},
					this));
					j = k.concat(l)
				}
				$.lightbox(j, h, c.callback, d);
				return false
			},
			utils: {
				isEmpty: function (a) {
					if (a == null) return true;
					if (Object.prototype.toString.call(a) === '[object String]' || $.type(a) === "array") return a.length === 0
				}
			}
		},
		lightbox: function (a, b, c) {
			var d = [];
			if ($.LightBoxObject.utils.isEmpty(a)) {
				return $.LightBoxObject
			}
			if ($.type(a) === "string") {
				d = [$.extend({},
				{
					href: a
				},
				b)]
			} else if ($.type(a) === "array") {
				var e = a[0];
				if ($.type(e) === "string") {
					for (var i = 0; i < a.length; i++) {
						d[i] = $.extend({},
						{
							href: a[i]
						},
						b)
					}
				} else if ($.type(e) === "object") {
					for (var i = 0; i < a.length; i++) {
						d[i] = $.extend({},
						b, a[i])
					}
				}
			} else if ($.type(a) === "object" && a[0].nodeType) {
				d = [$.extend({},
				{
					type: "element",
					href: "#",
					element: a
				},
				b)]
			}
			return $.LightBoxObject.show(d, b, c)
		}
	});
	$.fn.lightbox = function (a, b) {
		var c = {
			"selector": this.selector,
			"options": a,
			"callback": b
		};
		return $(this).live('click', function (e) {
			return $.proxy($.LightBoxObject.link, $.LightBoxObject)(e, $.extend({},
			c, {
				"element": this
			}))
		})
	};
	$(function () {
		if (parseFloat($.fn.jquery) > 1.2) {
			$.LightBoxObject.create()
		} else {
			throw "The jQuery version that was loaded is too old. Lightbox Evolution requires jQuery 1.3+";
		}
	})
})(jQuery, window, document);