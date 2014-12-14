function cbtwooslid(b) { (function (a) {
		var f = {
			blogURL: "",
			MaxPost: 4,
			woocontent: "",
			ImageSize: 500,
			Summarylength: 150,
			Rposta: true,
			loadingClass: "waiting",
			pBlank: "",
			MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			tagName: false
		};
		f = a.extend({},
		f, b);
		var g = a(f.woocontent);
		g.html('<div class="cbtpostslid_slider_wrap"><ul class="slides"></ul></div>').addClass(f.loadingClass);
		var h = function (D) {
			var z, B, x, e, F, C, G, j, E, y, A = "",
			w = D.feed.entry;
			for (var H = 0; H < w.length; H++) {
				for (var d = 0; d < w[H].link.length; d++) {
					if (w[H].link[d].rel == "alternate") {
						z = w[H].link[d].href;
						break
					}
				}
				if ("media$thumbnail" in w[H]) {
					F = w[H].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/s" + f.ImageSize);
					if (w[H].media$thumbnail.url.indexOf("img.youtube.com") != -1) {
						F = w[H].media$thumbnail.url.replace("default", "0")
					}
				} else {
					F = f.pBlank.replace(/\/s[0-9]+\-c/g, "/s" + f.ImageSize)
				}
				if ("content" in w[H]) {
					x = w[H].content.$t
				} else {
					if ("summary" in w[H]) {
						x = w[H].summary.$t
					} else {
						x = ""
					}
				}
				x = x.replace(/<\S[^>]*>/g, "");
				if (x.length > f.Summarylength) {
					x = x.substring(0, f.Summarylength) + "..."
				}
				B = w[H].title.$t;
				y = w[H].published.$t.substring(0, 10);
				C = y.substring(0, 4);
				G = y.substring(5, 7);
				j = y.substring(8, 10);
				E = f.MonthNames[parseInt(G, 10) - 1];
				A += '<li class="cbtpostslid_slider_item"><a title="' + B + '" class="" href="' + z + '"><img src="' + F + '"/></a><div class="slider_caption"><h3><a href="' + z + '">' + B + '</a></h3></div><p class="caption"><span class="post-meta"><span class="dd">' + j + '</span> <span class="dm">' + E + '</span> <span class="dy">' + C + "</span></span>" + x + "</p></li>"
			}
			g.find("ul.slides").append(A);
			if (!f.Rposta) {
				a(f.woocontent + " .cbtpostslid_slider_wrap").flexslider({
					animation: "fade",
					selector: ".slides > li",
					animationLoop: true,
					smoothHeight: true,
					pauseOnHover: true,
					mousewheel: true,
				});
				g.removeClass(f.loadingClass)
			}
		};
		a.get((f.blogURL === "" ? window.location.protocol + "//" + window.location.host: f.blogURL) + "/feeds/posts/summary" + (f.tagName === false ? "": "/-/" + f.tagName) + "?max-results=0&orderby=published&alt=json-in-script", function (e) {
			Total_Posts_Number = e.feed.openSearch$totalResults.$t;
			if (Total_Posts_Number <= f.MaxPost) {
				f.MaxPost = Total_Posts_Number
			}
			var r = [];
			while (r.length < f.MaxPost) {
				var p = Math.ceil(Math.random() * Total_Posts_Number);
				var d = false;
				for (var k = 0; k < r.length; k++) {
					if (r[k] == p) {
						d = true;
						break
					}
				}
				if (!d) {
					r[r.length] = p
				}
			}
			if (f.Rposta == true) {
				var j;
				for (var o = 0; o < f.MaxPost; o++) {
					j = a.get((f.blogURL === "" ? window.location.protocol + "//" + window.location.host: f.blogURL) + "/feeds/posts/default" + (f.tagName === false ? "": "/-/" + f.tagName) + "?start-index=" + r[o] + "&max-results=1&orderby=published&alt=json-in-script", h, "jsonp")
				}
				a.when(j).done(function () {
					a(f.woocontent + " .cbtpostslid_slider_wrap").flexslider({
						animation: "fade",
						selector: ".slides > li",
						animationLoop: true,
						smoothHeight: true,
						pauseOnHover: true,
						mousewheel: false,
						initDelay: f.MaxPost * 700,
					});
					g.removeClass(f.loadingClass)
				})
			} else {
				a.get((f.blogURL === "" ? window.location.protocol + "//" + window.location.host: f.blogURL) + "/feeds/posts/default" + (f.tagName === false ? "": "/-/" + f.tagName) + "?max-results=" + f.MaxPost + "&orderby=published&alt=json-in-script", h, "jsonp")
			}
		},
		"jsonp")
	})(jQuery)
};