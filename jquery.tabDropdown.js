/*
 * tabDropdown version 1.0.1
 * Author: Anish MM - anishmm@gmail.com
 * (c) 2012, Anish MM
 * Supported : jQuery v1.6+, jQuery UI 1.8+
 *
 * Simple:
 * 		$("#mytab").tabDropdown();
 * 		$("#mytab").tabDropdown({
 *  			tabcss: "tabDropdown",          // css name
 *  			Active: true,                   // Active dropdown features
 *  			dropDownText: "More",           // set drop down text
 *  			showCount: false,               // show drop down count
 *  			dropIcon: "&#9660; ",           // icon/caret - if using image, specify image width
 *  			dropWidth: "30%",               // width of dropdown
 *              maxTab: 4                       // max tab
 *  		});
 */

(function ($) {
    var methods = {
        init: function (op) {
            if (op === undefined) op = {};
            op = $.extend({}, $.fn.tabDropdown.defaults, op);
            return this.each(function () {
                var o = op,
                    $mt = $(this);
                (o.tabcss != '') && $mt;
                $mt.tabs();
                if (o.Active) {
                    var at = $('<div />').addClass(o.tabcss).appendTo($mt);
                    var ut = $mt.find('.ui-tabs-nav');
                    var ts = ut.find("li");
                    var xt = (ts.length - o.maxTab);
                    if (xt > 0) {
                        var tm, s = $("<li/>").addClass("ui-state-default").addClass("ui-corner-top").addClass("dropDown").appendTo(ut);
                        var r = $("<a/>").attr("href", "javascript: void(0);").html(o.dropIcon + o.dropDownText + (o.showCount === true ? " (" + xt + ")" : "")).appendTo(s);
                        r.click(function () {

                            clearTimeout(tm);
                            at.slideDown();
                            tm = setTimeout(function () {
                                at.slideUp();
                                clearTimeout(tm);
                            }, 3000)
                            var of = $(this).parent().offset();
                            of.top = (of.top + $(this).parent().height() + 1);
                            at.offset(of).css("width", o.dropWidth);
                        });
                        at.mouseenter(function () {
                            clearTimeout(tm);
                        });
                        at.mouseleave(function () {
                            clearTimeout(tm);
                            var $this = $(this)
                            tm = setTimeout(function () {
                                $this.slideUp()
                            }, 1000)
                        });
                        ts.each(function (i, t) {
                            if ((o.maxTab - 1) < i) {
                                $(t).css("display", "none");
                                var a = $(this).find('a');
                                var aa = $("<a/>").attr("href", "#tab").html(a.text());
                                aa.click(function (e) {
                                    at.slideUp();
                                    at.find("a").removeClass("highlight");
                                    a.click();
                                    ut.find(".dropDown").addClass('ui-tabs-selected').addClass('ui-state-active').find('a').css("cursor", "pointer");
                                    $(this).addClass('highlight');
                                }).appendTo(at);
                            } else {
                                $(t).find('a').click(function (e) {
                                    at.find("a").removeClass("highlight");
                                    ut.find(".dropDown").removeClass('ui-tabs-selected').removeClass('ui-state-active');
                                });
                            }
                        });
                    }
                }

            })
        }
    };
    $.fn.tabDropdown = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method);
        }
    }
    $.fn.tabDropdown.defaults = {
        tabcss: "my-class",
        Active: true,
        dropDownText: "More",
        showCount: false,
        dropIcon: "&#9660; ",
        dropWidth: "66%",
        maxTab: 4
    };
})(jQuery);
